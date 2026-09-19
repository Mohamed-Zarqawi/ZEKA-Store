import { Button } from "@/components/ui/button";
import { Field, FieldTitle } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

export function FilterLeftBarSkeleton() {
  const disabled = true;
  return (
    <div className="border-primary/30 sticky top-24 hidden h-fit w-full max-w-xs flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-7 backdrop-blur-md md:flex">
      {/* Header Skeleton */}
      <div className="text-primary flex flex-col gap-3">
        <div>FILTERS</div>
        <div className="bg-primary h-px w-full"></div>
      </div>

      <div className="mt-4 flex flex-col gap-8">
        {/* Section 1: Categories (6 Items) */}
        <div className="flex flex-col gap-4">
          <div className="text-primary text-lg">CATEGORY</div>

          <div className="mt-1 flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm bg-zinc-800" />
                <Skeleton className="h-4 w-30 rounded-sm bg-zinc-800/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Brands (6 Items) */}
        <div className="flex flex-col gap-4">
          <div className="text-primary text-lg">BRAND</div>
          <div className="mt-1 flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm bg-zinc-800" />
                <Skeleton className="h-4 w-30 rounded-sm bg-zinc-800/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Price Filter */}
        <div className="flex w-full flex-col gap-4">
          <div>
            <Field className="w-full max-w-xs">
              <FieldTitle className="text-primary text-lg">PRICE</FieldTitle>
              {/* <FieldDescription className="text-sm"></FieldDescription> */}

              <div>
                <Skeleton className="mb-1.5 h-2.5 w-25 rounded-full" />
              </div>
              <Slider
                value={[0, 1000000]}
                onValueChange={(val) => {}}
                min={0}
                max={1000}
                step={10}
                className="mt-2 w-full"
                aria-label="Price Range"
              />
            </Field>
          </div>
          {/* Slider track skeleton */}
        </div>

        {/* Apply Button Skeleton */}
        <Button
          variant={"default"}
          size={"default"}
          disabled={disabled}
          className="w-full cursor-pointer"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
