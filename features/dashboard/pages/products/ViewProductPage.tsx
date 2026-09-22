"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetProduct_Admin } from "./hooks/useProducts";

interface ViewProps {
  productId: string;
}

export const ViewProductPage = ({ productId }: ViewProps) => {
  const { data: product, isLoading: isProductLoading } =
    useGetProduct_Admin(productId);

  const images = product?.images;
  const imageUrl = images?.[0] ? `${images[0]}` : "/images/placeholder.jpeg";

  const router = useRouter();
  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    product && (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-primary text-3xl">{product.name}</div>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push(`/admin/products/${product.id}/edit`);
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
              <div className="text-muted-foreground">{product?.id}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Name</FieldLabel>
              <div className="text-muted-foreground">{product?.name}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Desciption
              </FieldLabel>
              <div className="text-muted-foreground">
                {product?.description}
              </div>
            </Field>
          </div>
        </div>

        {/* Brand details */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">Product Details</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">Category</FieldLabel>
              <div className="text-muted-foreground">
                {product?.category?.name}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Brand</FieldLabel>
              <div className="text-muted-foreground">
                {product?.brand?.name}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Price</FieldLabel>
              <div className="text-muted-foreground">${product?.price}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Stock</FieldLabel>
              <div className="text-muted-foreground">{product?.stock}</div>
            </Field>
          </div>
        </div>

        {/* Product Photos */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">Product Photos</div>

          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary mb-3 text-sm">
                Main photo
              </FieldLabel>

              <div className="relative flex w-full max-w-2xl gap-8">
                <div>
                  <img
                    src={imageUrl}
                    className="border-primary h-130 w-130 rounded-2xl border object-cover object-center hover:cursor-pointer"
                  />
                </div>
              </div>
            </Field>

            <Field className="mt-5">
              <FieldLabel className="text-primary mb-3 text-sm">
                Other photos
              </FieldLabel>
              <div className="flex gap-4">
                {product?.images && product?.images?.length > 1 ? (
                  product?.images
                    .slice(1)
                    .map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        className="border-primary h-45 w-45 rounded-2xl border object-cover object-center hover:cursor-pointer"
                      />
                    ))
                ) : (
                  <div className="text-destructive text-sm">
                    No other images
                  </div>
                )}
              </div>
            </Field>
          </div>
        </div>
      </div>
    )
  );
};
