"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { useEffect, useState } from "react";
import { useGetProductPrices } from "../pages/shop/hooks/useShop";

type Option = {
  label: string;
  value: string;
};

type FilterMenuType = {
  title: string;
  options: Option[];
};

interface FilterBarProps {
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

export const FilterBar = ({
  filterMenu,
  selectedCategories,
  selectedBrands,
  setSelectedCategories,
  setSelectedBrands,
  setPriceRange,
  setCurrentPage,
}: FilterBarProps) => {
  const [tempCategories, setTempCategories] =
    useState<string[]>(selectedCategories);

  const { data: prices, isLoading: isPricesLoading } = useGetProductPrices();

  const priceValues = prices?.map((item) => item.price);
  const minPrice = priceValues?.length ? Math.min(...priceValues) : 0;
  const maxPrice = priceValues?.length ? Math.max(...priceValues) : 1000;

  const [tempBrands, setTempBrands] = useState<string[]>(selectedBrands);
  const [tempPrice, setTempPrice] = useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    setTempCategories(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    setTempBrands(selectedBrands);
  }, [selectedBrands]);

  const handleTempCheckboxToggle = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleApply = () => {
    setSelectedCategories(tempCategories);
    setSelectedBrands(tempBrands);
    setPriceRange(tempPrice);
    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  const isUnchanged =
    tempCategories.length === selectedCategories.length &&
    tempCategories.every((cat) => selectedCategories.includes(cat)) &&
    tempBrands.length === selectedBrands.length &&
    tempBrands.every((brand) => selectedBrands.includes(brand)) &&
    tempPrice[0] === minPrice &&
    tempPrice[1] === maxPrice;

  return (
    <div className="border-primary sticky top-24 hidden h-fit w-full max-w-xs flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-7 backdrop-blur-md lg:flex">
      {/* Header */}
      <div className="text-primary flex flex-col gap-3">
        <div>FILTERS</div>
        <div className="bg-primary h-px w-full"></div>
      </div>

      <div className="mt-4 flex flex-col gap-8">
        {filterMenu.map((menu, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="text-primary text-lg">{menu.title}</div>

            <div className="flex flex-col gap-5">
              {menu.options.map((option, j: number) => {
                const checkboxId = `${menu.title}-${j}`;

                return (
                  <div key={j} className="flex items-center gap-3">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={
                        menu.title === "CATEGORY"
                          ? tempCategories.includes(option.value)
                          : tempBrands.includes(option.value)
                      }
                      onChange={() => {
                        if (menu.title === "CATEGORY") {
                          handleTempCheckboxToggle(
                            option.value,
                            tempCategories,
                            setTempCategories,
                          );
                        }

                        if (menu.title === "BRAND") {
                          handleTempCheckboxToggle(
                            option.value,
                            tempBrands,
                            setTempBrands,
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={checkboxId}
                      className="cursor-pointer text-sm text-zinc-400"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Price Filter */}
        <div className="flex w-full flex-col gap-4">
          <div>
            <Field className="w-full max-w-xs">
              <FieldTitle className="text-primary text-lg">PRICE</FieldTitle>
              <FieldDescription className="text-sm">
                ($
                <span className="tabular-nums">{tempPrice[0]}</span> -{" "}
                <span className="tabular-nums">{tempPrice[1]}</span>)
              </FieldDescription>
              <Slider
                value={tempPrice}
                isDot={true}
                onValueChange={(val) => setTempPrice(val)}
                min={minPrice}
                max={maxPrice}
                step={5}
                className="mt-2 w-full"
                aria-label="Price Range"
              />
            </Field>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          variant={"default"}
          disabled={isUnchanged}
          size={"default"}
          className="w-full cursor-pointer"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
