"use client";

import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getChangedValues } from "@/utils/getChangedValues";

import { CreateCategorySchema } from "@/types/admin/category";
import {
  useCreateCategoryAdmin,
  useGetAdminCategories,
} from "./hooks/useCategories";

const CreateCategoryPage = () => {
  const router = useRouter();
  const { mutateAsync: handleCreateProduct, isPending: isCreating } =
    useCreateCategoryAdmin();
  const { refetch: refetchCategories } = useGetAdminCategories();

  const {
    initialValues,
    dirty,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateCategorySchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await handleCreateProduct(changedValues);
      await refetchCategories();
    },
  });

  return (
    <div>
      <div className="text-primary text-3xl">CREATE Category</div>
      <div className="mt-10">
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex h-fit w-full flex-col items-center justify-center gap-7"
            noValidate
          >
            {/* 1 */}
            <div className="flex flex-col items-center justify-center gap-4"></div>

            {/* 2 */}

            <div className="group flex w-full flex-col items-end justify-center gap-4">
              <Input
                name="name"
                type="text"
                label="Name"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={values.name}
                onChange={handleChange}
                aria-invalid={!!errors.name && !!touched.name}
              />
            </div>

            {/* 3 */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Button
                type="submit"
                isPending={isCreating}
                pendingText="Creating"
                disabled={!dirty || isCreating}
                className="h-12 w-full rounded-lg px-4 py-4 text-center transition-colors duration-300 hover:cursor-pointer"
              >
                CREATE CATEGORY
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
