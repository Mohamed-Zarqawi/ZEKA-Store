"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Mars, Venus } from "lucide-react";

import ButtonsSelect from "@/components/myComponents/ButtonsSelect";
import SelectDate from "@/components/myComponents/SelectDate";
import SelectPhoneNumber from "@/components/myComponents/SelectPhoneNumber";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { Country } from "country-state-city";
import { useUpdateProfile } from "../../hooks/useProfile";

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
          <div className="text-base">Contact Information</div>
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

            <SelectPhoneNumber
              phoneNumberName="phoneNumber"
              phoneCodeName="phoneCode"
              phoneNumberValue={values.phoneNumber}
              phoneCodeValue={values.phoneCode}
              currentUser={currentUser}
              isLoading={isLoading}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
          </div>
        </div>

        {/* personal information */}

        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-6 md:px-8 md:py-10">
          <div className="text-base">Personal Information</div>
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
                <ButtonsSelect
                  label="Gender"
                  isLoading={isLoading}
                  variant={"outline"}
                  size={"icon-lg"}
                  value={String(values.gender)}
                  onChange={(selectedValue) =>
                    setFieldValue("gender", selectedValue)
                  }
                  options={[
                    {
                      label: "Male",
                      value: "male",
                      Icon: Mars,
                    },
                    {
                      label: "Female",
                      value: "female",
                      Icon: Venus,
                    },
                  ]}
                />
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
