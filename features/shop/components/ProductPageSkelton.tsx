import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkilton";

export const ProductPageSkeleton = () => {
  return (
    <div className="mx-10 my-15 animate-pulse">
      {/* القسم العلوي: الصور على اليسار والبيانات على اليمين */}
      <div className="flex h-fit w-full items-center gap-6">
        {/* اليسار: الصور (Thumbs + Main Image) */}
        <div className="relative flex w-full max-w-155 gap-8">
          {/* المصغرات Side Thumbnails */}
          <div className="flex h-130 w-31 flex-col gap-4 rounded-2xl">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="border-primary/20 h-25 w-full rounded-2xl border"
              />
            ))}
          </div>

          {/* الصورة الرئيسية Main Image */}
          <div className="w-full max-w-130 overflow-hidden rounded-2xl">
            <Skeleton className="border-primary/20 h-130 w-full max-w-130 rounded-2xl border" />
          </div>
        </div>

        {/* اليمين: تفاصيل المنتج (Product Details) */}
        <div className="flex h-130 w-full flex-col justify-between gap-4">
          <div className="w-full">
            {/* Category | Brand */}
            <Skeleton className="h-5 w-48" />

            {/* Title */}
            <Skeleton className="mt-6 h-12 w-3/4" />

            {/* Ratings */}
            <div className="mt-5 flex items-center gap-2">
              <Skeleton className="h-4 w-60" />
            </div>

            {/* Price */}
            <Skeleton className="mt-6 h-4 w-34" />

            {/* Description */}
            <div className="mt-6 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Stock indicator */}
            <Skeleton className="mt-6 h-5 w-32" />
          </div>

          {/* الأزرار في الأسفل: Add to Cart & Favorites */}
          <div className="flex w-full items-center justify-between gap-3">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* القسم السفلي: المنتجات المقترحة (Suggested Products) */}
      <div className="mt-15 flex flex-col gap-8">
        {/* Title */}
        <Skeleton className="h-8 w-100" />

        {/* Grid Product Cards */}
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 sm:gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
