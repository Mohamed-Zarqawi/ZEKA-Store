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
import { X } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useGetAdminProducts } from "../../products/hooks/useProducts";
import {
  useGetAdminRelatedProductsByBrand,
  useUpdateAdminBrandsProducts,
} from "../hooks/useBrands";

const AddProductToBrand = ({ brandId }: { brandId: number }) => {
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      limitUrlUpdates: debounce(1000),
      history: "replace",
    }),
  );

  const [searchValue, setSearchValue] = useState<string>(searchQuery ?? "");

  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    refetch: refetchProducts,
  } = useGetAdminProducts(
    1, // page
    [], // brands
    [], // brands
    0, // minPrice
    1000, // maxPrice
    searchQuery,
  );

  const { mutate: updateProducts, isPending: isUpdating } =
    useUpdateAdminBrandsProducts();

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useGetAdminRelatedProductsByBrand(brandId);

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

  const isLoading =
    isProductsLoading ||
    isRelatedProductsLoading ||
    isUpdating ||
    !brandId ||
    isProductsFetching;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Products</Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg">
            Add Products to brand
          </DialogTitle>
          <DialogDescription>
            Select the products you want to assign to this brand.
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex w-full items-center gap-2 md:w-auto">
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);

              if (!e.target.value || e.target.value == "") {
                setSearchQuery(String(""));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(String(searchValue));
              }
            }}
            className="h-12 w-full md:h-auto"
          />

          <Button
            variant={"none"}
            type="button"
            className="absolute left-241 h-13 cursor-pointer rounded-lg bg-none! outline-0"
            onClick={() => {
              setSearchQuery(String(""));
              setSearchValue("");
            }}
          >
            <X />
          </Button>
          <Button
            type="button"
            id="search"
            className="h-13 rounded-lg"
            onClick={() => {
              setSearchQuery(String(searchValue));
            }}
          >
            Search
          </Button>
        </div>
        <div className="no-scrollbar mt-2 grid max-h-[50vh] w-full grid-cols-2 gap-3 overflow-y-auto px-4 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products?.data && products?.data?.length > 0 ? (
            products?.data?.map((product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                isAdmin={true}
                pageType="brand"
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
                setSearchQuery(String(""));
                setSearchValue("");
              }}
            >
              Close
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => {
              updateProducts({
                brandId: brandId,
                productIds: selectedProductIds,
              });

              setOpen(false);
            }}
            disabled={isUpdating || isRelatedProductsLoading}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductToBrand;
