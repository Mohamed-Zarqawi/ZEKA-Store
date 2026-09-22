import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import ProductCardAdmin from "@/features/dashboard/components/ProductCardAdmin";
import { ProductCardSkeleton } from "@/features/shop/components/ProductCardSkilton";
import { ProductType } from "@/types/shop/product";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useGetAdminProducts } from "../../products/hooks/useProducts";
import {
  useGetAdminRelatedProductsByCategory,
  useUpdateAdminCategoryProducts,
} from "../hooks/useCategories";

const AddProductToCategory = ({ categoryId }: { categoryId: number }) => {
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      limitUrlUpdates: debounce(1000),
      history: "replace",
    }),
  );

  const [searchValue, setSearchValue] = useState<string>(searchQuery ?? "");

  const { data: products, isLoading: isProductsLoading } = useGetAdminProducts(
    1, // page
    [], // categories
    [], // brands
    0, // minPrice
    1000, // maxPrice
    searchQuery,
  );

  const { mutate: updateProducts, isPending } =
    useUpdateAdminCategoryProducts();

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useGetAdminRelatedProductsByCategory(categoryId);

  const [prevRelatedProducts, setPrevRelatedProducts] =
    useState(relatedProducts);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  if (relatedProducts !== prevRelatedProducts) {
    setPrevRelatedProducts(relatedProducts);
    setSelectedProductIds(
      relatedProducts
        ? relatedProducts.map((product: ProductType) => product.id)
        : [],
    );
  }

  const handleToggleProduct = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Products</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg">
            Add Products to category
          </DialogTitle>
          <DialogDescription>
            Select the products you want to assign to this category.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full items-center gap-2 md:w-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="h-12 w-full md:h-auto"
          />

          <Button
            variant={"outline"}
            className="h-12 rounded-lg"
            onClick={() => {
              setSearchQuery(String(""));
              setSearchValue("");
            }}
          >
            Reset Search
          </Button>
          <Button
            className="h-12 rounded-lg"
            onClick={() => {
              setSearchQuery(String(searchValue));
            }}
          >
            Search
          </Button>
        </div>
        <div className="no-scrollbar mt-2 grid max-h-[50vh] w-full grid-cols-2 gap-3 overflow-y-auto px-4 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
          {isRelatedProductsLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products?.data && products?.data?.length > 0 ? (
            products?.data?.map((product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                isAdmin={true}
                pageType="category"
                isLoading={isProductsLoading}
                isSelectable={true}
                isSelected={selectedProductIds.includes(product.id)}
                onSelect={(productId) => {
                  handleToggleProduct(productId);
                }}
              />
            ))
          ) : (
            <div className="text-muted-foreground col-span-full py-10 text-center text-base">
              No products found.
            </div>
          )}
        </div>

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => {
              updateProducts({
                categoryId: categoryId,
                productIds: selectedProductIds,
              });

              setOpen(false);
            }}
            disabled={isPending || isRelatedProductsLoading}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductToCategory;
