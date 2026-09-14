"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Mars, Venus } from "lucide-react";

import SelectDate from "@/components/myComponents/SelectDate";
import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { useUpdateProfile } from "../../hooks/useProfile";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country } from "country-state-city";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ALL_COUNTRIES = Country.getAllCountries();

const ProfilePage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { mutateAsync: handleUpdateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();

  type ProfileFormValues = {
    first_name: string;
    last_name: string;
    phoneNumber: string;
    gender: "male" | "female" | null;
    birthday: string | null;
    phoneCode: string;
  };
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
  } = useFormik<ProfileFormValues>({
    enableReinitialize: true,
    initialValues: {
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      phoneNumber: currentUser?.phoneNumber || "",
      phoneCode: currentUser?.phoneCode || "",
      gender: currentUser?.gender || null,
      birthday: currentUser?.birthday || null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      if (!currentUser) return;
      const changedValues = getChangedValues(values, initialValues);
      await handleUpdateProfile({
        userId: currentUser?.id,
        body: changedValues,
      });
    },
  });

  const isLoading = isCurrentUserLoading || !currentUser;

  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">PROFILE</div>
      <div className="text-muted-foreground mt-2 text-xs">
        View & Update Your Personal and Contact Information
      </div>
      {/* contact information */}
      <form onSubmit={handleSubmit}>
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-md">Contact Information</div>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:gap-4">
            <div>
              <Input
                name="email"
                type="text"
                value={currentUser?.email}
                onChange={handleChange}
                className="md:w-100!"
                readOnly
                label="Email"
                errors={errors}
                touched={touched}
                isLoading={isLoading}
              />
            </div>

            <Dialog>
              <DialogTrigger>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  readOnly
                  value={
                    values.phoneCode && values.phoneNumber
                      ? "+" + values.phoneCode + "-" + values.phoneNumber
                      : ""
                  }
                  placeholder="Add phone number"
                  onChange={handleChange}
                  className="w-full cursor-pointer md:w-100"
                  aria-invalid={!!errors.phoneNumber && !!touched.phoneNumber}
                />
              </DialogTrigger>
              <DialogContent className="w-full! min-w-fit!">
                <DialogTitle>
                  {currentUser?.phoneNumber == ""
                    ? "Add phone number"
                    : "Update phone number"}
                </DialogTitle>
                <div className="my-3 flex w-full items-center gap-2">
                  <Select
                    value={
                      ALL_COUNTRIES.find(
                        (c) =>
                          c.phonecode.replace("+", "") ===
                          String(values.phoneCode).replace("+", ""),
                      )?.isoCode || ""
                    }
                    onValueChange={(selectedIso) => {
                      const selectedCountry = ALL_COUNTRIES.find(
                        (c) => c.isoCode === selectedIso,
                      );
                      if (selectedCountry) {
                        setFieldValue(
                          "phoneCode",
                          selectedCountry.phonecode.replace("+", ""),
                        );
                      }
                    }}
                    onOpenChange={(open) => {
                      if (!open) setFieldTouched("phoneCode", true);
                    }}
                  >
                    <SelectTrigger className="w-fit shrink-0">
                      <SelectValue placeholder="+" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ALL_COUNTRIES.map((country) => {
                          const cleanCode = country.phonecode.replace("+", "");
                          return (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              +{cleanCode} ({country.isoCode})
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* 2. حقل رقم الهاتف (يأخذ باقي المساحة المتاحة بالكامل بفضل flex-1) */}
                  <div className="flex-1">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      isRequired={true}
                      touched={touched}
                      value={values.phoneNumber}
                      onChange={handleChange}
                      className="w-full"
                      aria-invalid={
                        !!errors.phoneNumber && !!touched.phoneNumber
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="h-11" variant="default">
                      Update Phone Number
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* personal information */}

        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-6 md:px-8 md:py-10">
          <div className="text-md">Personal Information</div>
          <div className="mt-5 flex flex-col gap-6 md:gap-4">
            <div className="flex flex-col gap-6 md:flex-row md:gap-4">
              {/* first name */}
              <div>
                <Input
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  isRequired={true}
                  value={values.first_name}
                  onChange={handleChange}
                  className="md:w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.first_name && !!touched.first_name}
                />
              </div>
              {/* last name */}
              <div>
                <Input
                  label="Last Name"
                  id="last_name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  className="md:w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.last_name && !!touched.last_name}
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-4">
              {/* birthday */}
              <SelectDate
                date={values?.birthday}
                onChange={(val) => setFieldValue("birthday", val)}
                isLoading={isLoading}
              />

              <div className="flex w-full flex-col justify-center gap-3">
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Gender
                  </FieldLabel>
                  <div className="flex w-full gap-3 md:gap-2">
                    {isLoading ? (
                      <Skeleton className="h-13 rounded-lg md:w-35" />
                    ) : (
                      <Button
                        variant={"outline"}
                        size={"icon-lg"}
                        type="button"
                        onClick={() => setFieldValue("gender", "male")}
                        className={`text-md border-primary w-full flex-1 gap-2 rounded-lg p-6 transition-all outline-none hover:cursor-pointer md:w-35 md:flex-initial ${values.gender === "male" ? "ring-secondary! bg-secondary/10! ring-1!" : ""}`}
                      >
                        <Mars className="size-5" />
                        Male
                      </Button>
                    )}

                    {isLoading ? (
                      <Skeleton className="h-13 rounded-lg md:w-35" />
                    ) : (
                      <Button
                        variant={"outline"}
                        size={"icon-lg"}
                        type="button"
                        onClick={() => setFieldValue("gender", "female")}
                        className={`text-md border-primary w-full flex-1 gap-2 rounded-lg p-6 transition-all outline-none hover:cursor-pointer md:w-35 md:flex-initial ${values.gender === "female" ? "ring-secondary! bg-secondary/10! ring-1!" : ""}`}
                      >
                        <Venus className="size-5" />
                        Female
                      </Button>
                    )}
                  </div>
                </Field>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="submit"
            variant="default"
            disabled={!dirty || isProfileUpdating}
            isPending={isProfileUpdating}
            pendingText="Updating"
            className="hidden w-full rounded-lg p-6 outline-none hover:cursor-pointer md:flex md:w-auto"
          >
            Update Profile
          </Button>
        </div>
        <Button
          type="submit"
          variant={"none"}
          size={"none"}
          disabled={!dirty || isProfileUpdating}
          isPending={isProfileUpdating}
          pendingText="Updating"
          className="bg-primary/60 border-primary sticky bottom-21 -mt-2 w-full rounded-xl px-3 py-4 text-center text-sm backdrop-blur-md transition-colors duration-300 disabled:static disabled:opacity-70 md:hidden"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};
export default ProfilePage;
