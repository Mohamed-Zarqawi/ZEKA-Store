"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetAdminCategory,
  useGetAdminRelatedProductsByCategory,
  useUpdateAdminCategory,
} from "./hooks/useCategories";

import { UpdateCategorySchema } from "@/types/admin/category";
import { getChangedValues } from "@/utils/getChangedValues";
import { useFormik } from "formik";
import ProductCardAdmin from "../../components/ProductCardAdmin";
import AddProductsToCategory from "./components/AddProductsToCategory";

interface ViewProps {
  categoryId: number;
}

export const EditCategoryPage = ({ categoryId }: ViewProps) => {
  const {
    data: category,
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = useGetAdminCategory(categoryId);

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useGetAdminRelatedProductsByCategory(categoryId);

  const { mutateAsync: updateCategory, isPending: isCategoryUpdating } =
    useUpdateAdminCategory();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    initialValues,
    dirty,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: category?.id || "",
      name: category?.name || "",
      created_at: category?.created_at || "",
    },
    validationSchema: UpdateCategorySchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await updateCategory({ categoryId, updatedData: changedValues });
      await refetchCategory();
    },
  });
  const router = useRouter();

  if (isCategoryLoading || isRelatedProductsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  const date = new Date(`${category?.created_at}`);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    category && (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="text-primary text-3xl">{category.name}</div>
            <Button
              type={"button"}
              variant={"outline"}
              onClick={() => {
                router.push(`/admin/categories/${category.id}`);
              }}
            >
              View Mode
            </Button>
          </div>
          {/* Basic information */}
          <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="text-lg">Basic Information</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">ID</FieldLabel>
                <div className="text-muted-foreground">{category?.id}</div>
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Created At
                </FieldLabel>
                <div className="text-muted-foreground">
                  {formattedDate} ({formattedTime})
                </div>
              </Field>

              <Input
                id="name"
                name="name"
                type="string"
                label="Name"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={values.name}
                onChange={handleChange}
                className="w-full sm:w-96"
                aria-invalid={!!errors.name && !!touched.name}
              />
            </div>
          </div>

          {/* Brand details */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="flex justify-between">
              <div className="text-lg">Manage Products</div>
              <AddProductsToCategory categoryId={categoryId} />
            </div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">
                  Related Products
                </FieldLabel>
                <div className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
                  {relatedProducts?.map((product, i) => (
                    <ProductCardAdmin
                      key={product.id}
                      product={product}
                      pageType="category"
                      isAdmin={true}
                      isLoading={isRelatedProductsLoading}
                    />
                  ))}
                  {relatedProducts?.length == 0 && "-"}
                </div>
              </Field>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="submit"
              variant="default"
              isPending={isCategoryUpdating}
              pendingText="Updating"
              disabled={!dirty || isCategoryUpdating}
              className="rounded-lg p-6 text-base hover:cursor-pointer"
            >
              Update Category
            </Button>
          </div>
        </form>
      </div>
    )
  );
};
