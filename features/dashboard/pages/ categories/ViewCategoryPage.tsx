"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCardAdmin from "../../components/ProductCardAdmin";
import {
  useGetCategory_Admin,
  useGetRelatedProductsByCategory_Admin,
} from "./hooks/useCategories";

interface ViewProps {
  categoryId: number;
}

export const ViewCategoryPage = ({ categoryId }: ViewProps) => {
  const { data: category, isLoading: isCategoryLoading } =
    useGetCategory_Admin(categoryId);

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useGetRelatedProductsByCategory_Admin(categoryId);

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

  const router = useRouter();
  if (isCategoryLoading || isRelatedProductsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    category && (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-primary text-3xl">{category.name}</div>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push(`/admin/categories/${category.id}/edit`);
            }}
          >
            Edit Mode
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

            <Field>
              <FieldLabel className="text-primary text-sm">Name</FieldLabel>
              <div className="text-muted-foreground">{category?.name}</div>
            </Field>
          </div>
        </div>

        {/* Brand details */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">Related Products</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">
                Related Products
              </FieldLabel>
              <div className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
                {relatedProducts?.map((product, i) => (
                  <ProductCardAdmin
                    key={product.id}
                    pageType="category"
                    product={product}
                    isAdmin={true}
                    isLoading={isRelatedProductsLoading}
                  />
                ))}
                {relatedProducts?.length == 0 && "-"}
              </div>
            </Field>
          </div>
        </div>
      </div>
    )
  );
};
