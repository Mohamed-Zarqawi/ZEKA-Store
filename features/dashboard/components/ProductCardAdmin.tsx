"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { ProductCardSkeleton } from "@/features/shop/components/ProductCardSkilton";
import { ProductType } from "@/types/shop/product";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardAdminProps {
  product: ProductType;
  isAdmin?: boolean;
  isLoading?: boolean;
  pageType: "user" | "category" | "brand" | "product";
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (productId: number) => void;
}

const ProductCardAdmin = ({
  product,
  isAdmin = false,
  isLoading = false,
  pageType,
  isSelectable = false,
  isSelected = false,
  onSelect,
}: ProductCardAdminProps) => {
  const router = useRouter();

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const handleCardClick = (e: React.MouseEvent) => {
    if (isSelectable) {
      e.preventDefault();
      onSelect?.(product.id);
    }
  };

  if (isCurrentUserLoading || !product || isLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <div onClick={handleCardClick}>
      <div
        className={`group flex h-79 w-full flex-col overflow-hidden rounded-2xl border-[1.5px] transition-all duration-150 md:h-99 ${isSelected ? "border-primary" : "border-border bg-card"}`}
      >
        {/* image & cart icon */}

        <div className="relative">
          {/* love icon */}

          <div className={`${isAdmin ? "flex" : "hidden"} flex-col`}>
            <Button
              variant="none"
              type="button"
              size="none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/admin/products/${product.id}/edit`);
              }}
              className="bg-primary/80 border-primary absolute right-3 bottom-3 cursor-pointer rounded-lg p-1.5 md:right-4 md:bottom-5"
            >
              <Edit className="size-4 cursor-pointer" />
            </Button>

            <div className="absolute top-3 left-3 flex flex-col gap-2 md:top-5 md:left-4">
              {product.stock < 5 && product.stock > 0 ? (
                <Badge
                  variant={"default"}
                  className="bg-primary/80 cursor-pointer rounded-lg border p-1.5 text-[9px] transition-transform duration-300 md:text-[10px]"
                >
                  {product?.stock} Left in stock
                </Badge>
              ) : null}

              {product.stock == 0 ? (
                <Badge
                  variant={"default"}
                  className="bg-primary/80 cursor-pointer rounded-lg border p-1.5 text-[9px] transition-transform duration-300 md:text-[10px]"
                >
                  Out of stock
                </Badge>
              ) : null}
            </div>

            {isSelectable && (
              <div className="absolute top-3 right-3 md:top-5 md:right-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(e) => {
                    onSelect?.(product.id);
                  }}
                  className={`text-foreground! pointer-events-none ${isSelected ? "bg-primary!" : "bg-foreground!"}`}
                />
              </div>
            )}
          </div>

          {/* image */}

          <Image
            src={product.images?.[0] || "/images/placeholder.jpeg"}
            alt={product.name || "Product Image"}
            width={640}
            height={400}
            className="h-46 w-full object-cover object-center hover:cursor-pointer md:h-64"
          />
        </div>
        {/* content */}
        <div className="bg-card flex h-full flex-col justify-between p-3 md:p-4">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] text-zinc-400 md:text-xs">
              {product.brand?.name ? product.brand.name : "No Brand"}
            </div>
            <div className="line-clamp-2 text-[11px] md:text-sm">
              {product.name}
            </div>
          </div>

          <div className="mt-2 flex w-full items-center justify-between md:mt-3">
            <div className="flex w-full flex-col-reverse items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
              <Badge
                variant={"outline"}
                className="bg-primary/20! text-[8px] md:text-[0.625rem]"
              >
                {product.category?.name ? product.category.name : "No Category"}
              </Badge>

              <div className="text-primary text-xs md:text-sm">
                ${product.price ? product.price.toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
