"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { useEffect, useState } from "react";
import { useGetProductPrices } from "../pages/shop/hooks/useShop";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FilterMenuType = {
  title: string;
  options: Option[];
};

interface FilterPopoverProps {
  filterMenu: FilterMenuType[];
  selectedCategories: string[];
  selectedBrands: string[];
  handleFilterChange?: (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  value?: number[];
  setValue?: React.Dispatch<React.SetStateAction<number[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterPopover = ({
  filterMenu,
  selectedCategories,
  selectedBrands,
  setSelectedCategories,
  setSelectedBrands,
  setPriceRange,
  setCurrentPage,
}: FilterPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // حالات مؤقتة لحفظ الاختيارات قبل الضغط على Apply
  const [tempCategories, setTempCategories] =
    useState<string[]>(selectedCategories);
  const [tempBrands, setTempBrands] = useState<string[]>(selectedBrands);

  // جلب الأسعار
  const { data: prices } = useGetProductPrices();
  const priceValues = prices?.map((item) => item.price);
  const minPrice = priceValues?.length ? Math.min(...priceValues) : 0;
  const maxPrice = priceValues?.length ? Math.max(...priceValues) : 1000;

  const [tempPrice, setTempPrice] = useState<number[]>([minPrice, maxPrice]);

  // استخراج الخيارات مباشرة من filterMenu
  const categoryOptions =
    filterMenu.find((m) => m.title.toUpperCase() === "CATEGORY")?.options || [];
  const brandOptions =
    filterMenu.find((m) => m.title.toUpperCase() === "BRAND")?.options || [];

  // مزامنة الحالات عند التغيير الخارجي
  useEffect(() => {
    setTempCategories(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    setTempBrands(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    if (priceValues?.length) {
      setTempPrice([minPrice, maxPrice]);
    }
  }, [prices]);

  const handleApply = () => {
    setSelectedCategories(tempCategories);
    setSelectedBrands(tempBrands);
    setPriceRange(tempPrice);
    if (setCurrentPage) {
      setCurrentPage(1);
    }
    setIsOpen(false); // إغلاق الـ Popover بعد التطبيق
  };

  const handleReset = () => {
    setTempCategories([]);
    setTempBrands([]);
    setTempPrice([minPrice, maxPrice]);
  };

  const isUnchanged =
    tempCategories.length === selectedCategories.length &&
    tempCategories.every((cat) => selectedCategories.includes(cat)) &&
    tempBrands.length === selectedBrands.length &&
    tempBrands.every((brand) => selectedBrands.includes(brand)) &&
    tempPrice[0] === minPrice &&
    tempPrice[1] === maxPrice;

  // تحديد القيم الحالية للـ Select (تأخذ القيمة الأولى أو "all")
  const currentCategoryValue = tempCategories[0] || "all";
  const currentBrandValue = tempBrands[0] || "all";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="block h-13 lg:hidden">Filters</Button>
      </PopoverTrigger>

      <PopoverContent
        className="max-h-[85vh] w-80 overflow-y-auto p-5"
        align="end"
      >
        {/* Header */}
        <PopoverHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-3">
          <PopoverTitle className="text-primary text-lg">Filters</PopoverTitle>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer text-xs text-zinc-400 underline hover:text-white"
          >
            Reset All
          </button>
        </PopoverHeader>

        <div className="flex flex-col gap-5">
          {/* Category Select */}
          <Field>
            <FieldLabel className="text-primary text-sm">Category</FieldLabel>
            <Select
              value={currentCategoryValue}
              onValueChange={(val) =>
                setTempCategories(val === "all" ? [] : [val])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          {/* Brand Select */}
          <Field>
            <FieldLabel className="text-primary text-sm font-semibold">
              Brand
            </FieldLabel>
            <Select
              value={currentBrandValue}
              onValueChange={(val) => setTempBrands(val === "all" ? [] : [val])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brandOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          {/* Price Range Slider */}
          <div className="flex w-full flex-col gap-2 border-t border-zinc-800 pt-4">
            <Field className="w-full">
              <FieldTitle className="text-primary text-sm">PRICE</FieldTitle>
              <FieldDescription className="text-xs text-zinc-400">
                (${tempPrice[0]} - ${tempPrice[1]})
              </FieldDescription>
              <Slider
                value={tempPrice}
                isDot={true}
                onValueChange={(val) => setTempPrice(val)}
                min={minPrice}
                max={maxPrice}
                step={5}
                className="mt-3 w-full"
                aria-label="Price Range"
              />
            </Field>
          </div>

          {/* Apply Button */}
          <Button
            onClick={handleApply}
            variant="default"
            disabled={isUnchanged}
            className="mt-2 w-full cursor-pointer"
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
