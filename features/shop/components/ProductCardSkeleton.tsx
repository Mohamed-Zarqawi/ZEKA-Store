import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border-border flex h-79 w-full flex-col overflow-hidden rounded-2xl border md:h-99">
      {/* Image Skeleton */}
      <div className="relative h-46 w-full shrink-0 md:h-64">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Top Right Icon Skeleton (Favorite Button) */}
        <Skeleton className="absolute top-2 right-2 size-8 rounded-lg md:top-4 md:right-4" />

        {/* Bottom Right Icon Skeleton (Cart Button) */}
        <Skeleton className="absolute right-2 bottom-2 size-7 rounded-lg md:right-3 md:bottom-3" />
      </div>

      {/* Content Skeleton */}
      <div className="bg-card flex h-full flex-col justify-between p-3 md:gap-0 md:p-4">
        <div className="flex flex-col gap-2">
          {/* Brand Skeleton */}
          <Skeleton className="h-3 w-20" />
          {/* Title Skeleton (2 lines) */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-full md:h-4" />
            <Skeleton className="h-3 w-4/5 md:h-4" />
          </div>
        </div>

        {/* Footer Skeleton (Category & Price) */}
        <div className="flex w-full flex-col-reverse items-start gap-2 md:mt-3 md:flex-row md:items-center md:justify-between md:gap-0">
          <Skeleton className="h-5 w-25 rounded-full md:h-5 md:w-22" />
          <Skeleton className="h-3 w-12 md:h-4 md:w-14" />
        </div>
      </div>
    </div>
  );
}
