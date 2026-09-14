"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/shop/product";
import * as React from "react";
import { useState } from "react";
import { FilterBar } from "../../components/FilterLeftBar";
import { FilterLeftBarSkeleton } from "../../components/FilterLeftBarSkilton";
import ProductCard from "../../components/ProductCard";
import { ProductCardSkeleton } from "../../components/ProductCardSkilton";
import {
  useGetProductPrices,
  useGetShopBrands,
  useGetShopCategories,
  useGetShopProducts,
} from "./hooks/useShop";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterPopover } from "../../components/FilterPopover";

type Option = {
  label: string;
  value: string;
};

const ShopPage = () => {
  // ----------- Showing Products Processes ------------

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [value, setValue] = useState<number[]>([0, 1000]);
  const { data: prices, isLoading: isPricesLoading } = useGetProductPrices();

  const { data: products, isLoading: isProductsLoading } = useGetShopProducts(
    currentPage,
    selectedCategories,
    selectedBrands,
    priceRange[0],
    priceRange[1],
  );

  // ----------- get categories and brands names ------------

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetShopCategories();
  const { data: brands, isLoading: isBrandsLoading } = useGetShopBrands();

  const categoriesOptions: Option[] = Array.isArray(categories)
    ? categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const brandsOptions: Option[] = Array.isArray(brands)
    ? brands.map((brand: any) => ({
        label: brand.name,
        value: brand.id,
      }))
    : [];

  // ----------- calculate first and last product in page ------------

  const totalPages = products?.meta?.pagination?.pageCount ?? 1;
  const productsNumber = products?.meta?.pagination?.total ?? 0;
  const fromItem =
    products?.data?.length === 0 ? 0 : (currentPage - 1) * 12 + 1;
  const toItem = Math.min(currentPage * 12, productsNumber);

  // ----------- filter handeling ------------

  const filterMenu = [
    {
      title: "CATEGORY",
      options: categoriesOptions,
    },
    {
      title: "BRAND",
      options: brandsOptions,
    },
  ];

  const handleFilterChange = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
    setCurrentPage(1);
  };

  // if (
  //   isProductsLoading ||
  //   !products ||
  //   isBrandsLoading ||
  //   isCategoriesLoading
  // ) {
  //   return (
  //     <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
  //       {/* 1 */}
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="text-primary text-3xl">Loading Products . . .</div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="mx-4 mt-6 flex flex-wrap gap-6 lg:mx-10 lg:mt-15 lg:gap-10">
      {/* Left - Filter Component */}

      {isCategoriesLoading || isBrandsLoading || isPricesLoading ? (
        <FilterLeftBarSkeleton />
      ) : (
        <FilterBar
          filterMenu={filterMenu}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          handleFilterChange={handleFilterChange}
          setSelectedCategories={setSelectedCategories}
          setSelectedBrands={setSelectedBrands}
          value={value}
          setValue={setValue}
          setPriceRange={setPriceRange}
          setCurrentPage={setCurrentPage}
        />
      )}

      <div className="flex min-h-screen w-full flex-1 flex-col gap-6 lg:gap-10">
        {/* 1 R - Header */}
        <div className="flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-end">
          <div className="flex w-full items-center justify-between">
            <div className="text-primary text-xl md:text-2xl lg:text-3xl">
              PRODUCTS
            </div>

            <FilterPopover
              filterMenu={filterMenu}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              handleFilterChange={handleFilterChange}
              setSelectedCategories={setSelectedCategories}
              setSelectedBrands={setSelectedBrands}
              value={value}
              setValue={setValue}
              setPriceRange={setPriceRange}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {isProductsLoading ? (
            <Skeleton className="h-4 w-65 rounded-sm bg-zinc-800" />
          ) : (
            <div className="text-xs whitespace-nowrap text-zinc-400 md:text-sm">
              Showing{" "}
              <span className="text-primary">
                {fromItem} - {toItem}
              </span>{" "}
              of <span className="text-primary">{productsNumber}</span> products
            </div>
          )}
        </div>

        {/* 2 R - Flexible Grid */}
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
          {isProductsLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products?.data && products?.data?.length > 0 ? (
            products.data.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-muted-foreground col-span-full py-10 text-center">
              No products found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mb-8 flex w-full justify-center">
        <div className="flex gap-3">
          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <Button
              variant={"outline"}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`border-border h-8 w-8 cursor-pointer border! text-sm lg:h-10 lg:w-10 ${
                currentPage === index + 1 ? "bg-primary!" : ""
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
