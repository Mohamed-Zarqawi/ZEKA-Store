"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import AddressCard from "@/features/profile/pages/addresses/components/AddressCard";
import OrderCard from "@/features/profile/pages/orders/components/OrderCard";
import ProductCard from "@/features/shop/components/ProductCard";
import { Loader2, Mars, Venus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUserAdmin, useUpdateUserAdmin } from "./hooks/useUser";

import ButtonsSelect from "@/components/myComponents/ButtonsSelect";
import SelectInput from "@/components/myComponents/SelectInput";
import SelectPhoneNumber from "@/components/myComponents/SelectPhoneNumber";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema } from "@/types/admin/user";
import { User } from "@/types/auth/user";
import { getChangedValues } from "@/utils/getChangedValues";
import { useFormik } from "formik";

interface ViewProps {
  userId: string;
}

const EditUserPage = ({ userId }: ViewProps) => {
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetUserAdmin(userId);

  const { mutateAsync: updateUser, isPending: isUserUpdating } =
    useUpdateUserAdmin();

  const router = useRouter();
  const userName = (user?.first_name, user?.last_name);

  const code = user?.phoneCode;
  const number = user?.phoneNumber;
  const fullNumber = code && number ? `+${code}-${number}` : "-";

  const state = user?.is_blocked;
  const isAvailable = state == false;
  const roleOptions = ["admin", "user", "support"];
  const stateOptions = ["blocked", "active"];

  const handleEditProduct = async (updatedData: Partial<User>) => {
    await updateUser({ userId, updatedData });
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
    setFieldTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?.id || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      birthday: user?.birthday || "",
      phoneCode: user?.phoneCode || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "",
      created_at: user?.created_at || "",
      is_blocked: user?.is_blocked || false,
      addresses: user?.addresses || [],
      favorite_items: user?.favorite_items || [],
      orders: user?.orders || [],
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await updateUser({ userId, updatedData: changedValues });
      await refetchUser();
    },
  });

  console.log(user);
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    user && (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="text-primary text-3xl">{userName}</div>
            <Button
              variant={"outline"}
              onClick={() => {
                router.push(`/admin/users/${user.id}/edit`);
              }}
            >
              Edit Mode
            </Button>
          </div>
          {/* System Data */}
          <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="text-lg">System Data</div>
            <div className="mt-5 flex w-full flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">ID</FieldLabel>
                <div className="text-muted-foreground">{user?.id}</div>
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Login at
                </FieldLabel>
                <div className="text-muted-foreground">{user?.created_at}</div>
              </Field>

              <SelectInput
                label="Role"
                name="role"
                placeholder="Select Role"
                options={roleOptions}
                value={values.role}
                errors={errors}
                touched={touched}
                onValueChange={(value) => setFieldValue("role", value)}
                onOpenChange={(open) => {
                  if (!open) setFieldTouched("role", true);
                }}
              />

              <SelectInput
                label="State"
                name="is_blocked"
                placeholder="Select State"
                options={stateOptions}
                value={values.is_blocked ? "blocked" : "active"}
                errors={errors}
                touched={touched}
                onValueChange={(value) =>
                  setFieldValue("is_blocked", value === "blocked")
                }
                onOpenChange={(open) => {
                  if (!open) setFieldTouched("is_blocked", true);
                }}
              />
            </div>
          </div>

          {/* Personal Data */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="text-lg">Personal Data</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Input
                id="first_name"
                name="first_name"
                label="First Name"
                isRequired={true}
                errors={errors}
                isLoading={isUserLoading}
                touched={touched}
                value={values.first_name}
                onChange={handleChange}
                className="w-full sm:w-96"
                aria-invalid={!!errors.first_name && !!touched.first_name}
              />

              <Input
                id="last_name"
                name="last_name"
                label="Last Name"
                errors={errors}
                touched={touched}
                isLoading={isUserLoading}
                value={values.last_name}
                onChange={handleChange}
                className="w-full sm:w-96"
                aria-invalid={!!errors.last_name && !!touched.last_name}
              />

              <ButtonsSelect
                label="Gender"
                isLoading={isUserLoading}
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

          {/* Contact Data */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="text-lg">Contact Data</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">Email</FieldLabel>
                <div className="text-muted-foreground">{user?.email}</div>
              </Field>

              <SelectPhoneNumber
                phoneNumberName="phoneNumber"
                phoneCodeName="phoneCode"
                phoneNumberValue={values.phoneNumber}
                phoneCodeValue={values.phoneCode}
                currentUser={user}
                isLoading={isUserLoading}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Addresses
                </FieldLabel>
                <div className="mt-1 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  {user?.addresses?.map((Address, i) => {
                    console.log(Address);
                    return (
                      <AddressCard key={i} address={Address} isAdmin={true} />
                    );
                  })}
                  {user?.addresses?.length == 0 && "-"}
                </div>
              </Field>
            </div>
          </div>

          {/* Activity Metrics */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="text-lg">User Activity</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">Orders</FieldLabel>
                <div className="mt-1 flex flex-col gap-4">
                  {user?.orders?.map((order) => (
                    <OrderCard key={order.id} order={order} isAdmin={true} />
                  ))}
                  {user?.orders?.length == 0 && "-"}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Favorites
                </FieldLabel>
                <div className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
                  {user.favorite_items.map((favorite, i) => (
                    <ProductCard
                      key={favorite.id}
                      product={favorite.product}
                      isAdmin={true}
                    />
                  ))}
                  {user.favorite_items?.length == 0 && "-"}
                </div>
              </Field>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="submit"
              variant="default"
              isPending={isUserUpdating}
              pendingText="Updating"
              disabled={!dirty || isUserUpdating}
              className="rounded-lg p-6 text-base hover:cursor-pointer"
            >
              Update User
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default EditUserPage;
