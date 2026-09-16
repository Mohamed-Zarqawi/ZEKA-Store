import { Skeleton } from "@/components/ui/skeleton";

const OrderProductSkeleton = () => {
  return (
    <div className="flex h-35 flex-col items-center py-5 md:h-fit md:flex-row md:justify-between md:gap-5">
      {/* Product Image & Details Container */}
      <div className="flex h-full w-full items-start gap-3 md:h-fit md:items-center md:gap-5">
        {/* Product Image Skeleton */}
        <Skeleton className="border-primary/20 aspect-square h-full w-23 shrink-0 rounded-2xl border md:h-25 md:w-25" />

        {/* Product Info & Actions */}
        <div className="flex h-full w-full flex-col justify-between md:my-0 md:flex-row md:items-center">
          {/* Title and Price Skeletons */}
          <div className="mt-1 flex flex-col gap-2 md:mt-0">
            <Skeleton className="h-4 w-full md:w-80" /> {/* Product Name */}
            <Skeleton className="h-4 w-16" /> {/* Price */}
          </div>

          {/* Counter and Button Skeletons */}
          <div className="flex items-center gap-2 md:justify-between md:gap-3">
            {/* Desktop Button Skeleton */}
            <Skeleton className="hidden h-10 w-37 rounded-md md:block" />
            {/* Mobile Button Skeleton */}
            <Skeleton className="block h-8 w-26 rounded-md md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCardSkeleton = () => {
  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">ORDERS</div>
      <div className="text-muted-foreground mt-2 text-xs">
        View & Update Your Personal and Contact Information
      </div>
      <div className="-mt-4 md:mt-10">
        <div className="border-primary mt-10 flex w-full flex-col gap-4 rounded-3xl border bg-[#1a1a1a]/20 p-5 md:p-7">
          {/* Date Text Skeleton */}
          <Skeleton className="-mb-4 h-5 w-full md:w-80" />

          {/* Divider */}
          <div className="border-primary my-4 -mb-3 w-full border-b"></div>

          {/* Products List Skeletons (نعرض منتجين افتراضياً كشكل تجريبي داخل الكارد) */}
          <div className="divide-primary/40 flex w-full flex-col divide-y">
            <OrderProductSkeleton />
            <OrderProductSkeleton />
            <OrderProductSkeleton />
            <OrderProductSkeleton />
          </div>

          {/* Footer (Order ID) Skeleton */}
          <div className="-mt-4 flex flex-col gap-3">
            <div className="bg-primary/40 h-px w-full"></div>
            <Skeleton className="h-5 w-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
