"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetBrand_Admin,
  useGetRelatedProductsByBrand_Admin,
  useUpdateBrand_Admin,
} from "./hooks/useBrands";

import { UpdateBrandSchema } from "@/types/admin/brand";
import { getChangedValues } from "@/utils/getChangedValues";
import { useFormik } from "formik";
import ProductCardAdmin from "../../components/ProductCardAdmin";
import AddProductToBrand from "./components/AddProductsToBrand";

interface ViewProps {
  brandId: number;
}

export const EditBrandPage = ({ brandId }: ViewProps) => {
  const {
    data: brand,
    isLoading: isBrandLoading,
    refetch: refetchBrand,
  } = useGetBrand_Admin(brandId);

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useGetRelatedProductsByBrand_Admin(brandId);

  const { mutateAsync: updateBrand, isPending: isBrandUpdating } =
    useUpdateBrand_Admin();

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
      id: brand?.id || "",
      name: brand?.name || "",
      created_at: brand?.created_at || "",
    },
    validationSchema: UpdateBrandSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await updateBrand({ brandId, updatedData: changedValues });
      await refetchBrand();
    },
  });
  const router = useRouter();

  if (isBrandLoading || isRelatedProductsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  const date = new Date(`${brand?.created_at}`);

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
    brand && (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="text-primary text-3xl">{brand.name}</div>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                router.push(`/dashboard/brands/${brand.id}`);
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
                <div className="text-muted-foreground">{brand?.id}</div>
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
                type="text"
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
              <AddProductToBrand brandId={brandId} />
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
                      pageType="brand"
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
              isPending={isBrandUpdating}
              pendingText="Updating"
              disabled={!dirty || isBrandUpdating}
              className="rounded-lg p-6 text-base hover:cursor-pointer"
            >
              Update Brand
            </Button>
          </div>
        </form>
      </div>
    )
  );
};
