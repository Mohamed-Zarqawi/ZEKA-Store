"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SelectPhoneNumber from "@/components/myComponents/SelectPhoneNumber";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { AddAddressSchema, AddressType } from "@/types/profile/address";
import { City, Country } from "country-state-city";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useAddAddress } from "../hooks/useAddresses";

const ALL_COUNTRIES = Country.getAllCountries();
const AddAddressPage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const { mutate: handleAddAddress, isPending: isAdding } = useAddAddress();

  type AddressFormikType = {
    title: string;
    phone: string;
    phoneCode: string;
    isDefault: boolean;
    name: string;
    addressLine: string;
    addressDetails: string;
    zip: string;
    city: string;
    country: string;
  };

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
  } = useFormik<AddressFormikType>({
    enableReinitialize: true,
    initialValues: {
      title: "Other",
      phone: "",
      phoneCode: "",
      isDefault: false,
      name: "",
      addressLine: "",
      addressDetails: "",
      zip: "",
      city: "",
      country: "",
    },
    validationSchema: AddAddressSchema,
    onSubmit: (values) => {
      if (!currentUser?.id) return;

      handleAddAddress({
        userId: currentUser.id,
        addressData: values as unknown as AddressType,
      });
    },
  });

  const selectedCountryObj = useMemo(() => {
    return ALL_COUNTRIES.find(
      (c) =>
        c.name.toLowerCase() === values.country?.toLowerCase() ||
        c.isoCode === values.country,
    );
  }, [values.country]);

  const uniqueCities = useMemo(() => {
    if (!selectedCountryObj) return [];
    const rawCities = City.getCitiesOfCountry(selectedCountryObj.isoCode) || [];
    return Array.from(
      new Map(rawCities.map((city) => [city.name, city])).values(),
    );
  }, [selectedCountryObj]);

  const isLoading = isCurrentUserLoading || !ALL_COUNTRIES;

  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">Add New Address</div>
      <form onSubmit={handleSubmit}>
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-lg">Address Details</div>
          <div className="mt-5 flex flex-wrap gap-4 md:gap-6">
            <div className="flex w-full flex-col md:w-auto">
              <FieldLabel
                htmlFor="addressTitle"
                className="text-primary mb-2 text-sm"
              >
                Address Title
              </FieldLabel>
              {isLoading ? (
                <div className="flex w-full items-center gap-2 md:w-auto md:gap-3">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 flex-1" />
                </div>
              ) : (
                <div
                  id="addressTitle"
                  className="flex w-full items-center gap-2 md:w-auto md:gap-3"
                >
                  <Button
                    onClick={() => setFieldValue("title", "Home")}
                    type="button"
                    variant={"outline"}
                    className={`border-primary h-12 flex-1 rounded-lg border outline-none hover:cursor-pointer md:h-11 ${values.title === "Home" ? "ring-secondary! bg-secondary/10! ring-2!" : ""}`}
                  >
                    Home
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setFieldValue("title", "Work")}
                    variant={"outline"}
                    className={`border-primary h-12 flex-1 rounded-lg border outline-none hover:cursor-pointer md:h-11 ${values.title === "Work" ? "ring-secondary! bg-secondary/10! ring-2!" : ""}`}
                  >
                    Work
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => setFieldValue("title", "Other")}
                    className={`border-primary h-12 flex-1 rounded-lg border outline-none hover:cursor-pointer md:h-11 ${values.title === "Other" ? "ring-secondary! bg-secondary/10! ring-2!" : ""}`}
                  >
                    Other
                  </Button>
                </div>
              )}
            </div>

            <Input
              id="addressLine"
              name="addressLine"
              label="Address Line"
              isRequired={true}
              errors={errors}
              isLoading={isLoading}
              touched={touched}
              value={values.addressLine}
              onChange={handleChange}
              className="w-full"
              aria-invalid={!!errors.addressLine && !!touched.addressLine}
            />

            <Input
              id="addressDetails"
              name="addressDetails"
              label="Address Details"
              isRequired={true}
              errors={errors}
              touched={touched}
              isLoading={isLoading}
              value={values.addressDetails}
              onChange={handleChange}
              className="w-full"
              aria-invalid={!!errors.addressDetails && !!touched.addressDetails}
            />

            <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">
                  Country<span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  value={values.country}
                  onValueChange={(value) => {
                    setFieldValue("country", value);
                    setFieldValue("city", "");
                  }}
                  onOpenChange={(open) => {
                    if (!open) setFieldTouched("country", true);
                  }}
                >
                  {isLoading ? (
                    <Skeleton className="h-12.5 rounded-lg md:h-13" />
                  ) : (
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  )}

                  <SelectContent>
                    <SelectGroup>
                      {ALL_COUNTRIES.map((country, i) => (
                        <SelectItem key={country.isoCode} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.country && touched.country && (
                  <FieldError>{String(errors.country)}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  City<span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  value={values.city}
                  onValueChange={(value) => {
                    setFieldValue("city", value);
                  }}
                  onOpenChange={(open) => {
                    if (!open) setFieldTouched("city", true);
                  }}
                >
                  {isLoading ? (
                    <Skeleton className="h-12.5 rounded-lg md:h-13" />
                  ) : (
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                  )}

                  <SelectContent>
                    <SelectGroup>
                      {uniqueCities.map((city) => (
                        <SelectItem
                          key={(city.latitude, city.name)}
                          value={city.name}
                        >
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.city && touched.city && (
                  <FieldError>{String(errors.city)}</FieldError>
                )}
              </Field>

              <Input
                id="zip"
                name="zip"
                label="ZIP Code"
                isLoading={isLoading}
                isRequired={false}
                errors={errors}
                touched={touched}
                value={values.zip}
                onChange={handleChange}
                className="w-full"
                aria-invalid={!!errors.zip && !!touched.zip}
              />
            </div>
          </div>
        </div>

        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="-semibold text-lg">Receiver Details</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Input
              id="name"
              name="name"
              label="Full Name"
              isRequired={true}
              errors={errors}
              touched={touched}
              isLoading={isLoading}
              value={values.name}
              onChange={handleChange}
              className="w-full md:w-100!"
              aria-invalid={!!errors.name && !!touched.name}
            />

            <SelectPhoneNumber
              phoneNumberName="phoneNumber"
              phoneCodeName="phoneCode"
              phoneNumberValue={values.phone}
              phoneCodeValue={values.phoneCode}
              currentUser={currentUser}
              isLoading={isCurrentUserLoading}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            size={"lg"}
            disabled={!dirty}
            isPending={isAdding}
            pendingText="Creating"
            type="submit"
            className="mt-6 flex justify-center rounded-lg p-6 text-base outline-none hover:cursor-pointer"
          >
            Create Address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressPage;
