import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton"; // تأكد من مسار الاستيراد

export const ProductPageSkeleton = () => {
  return (
    <div className="mx-0 mt-6 animate-pulse md:mx-10 md:my-15">
      {/* القسم العلوي: الصور والبيانات */}
      <div className="flex h-fit w-full flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
        {/* اليسار: قسم الصور (بما في ذلك معلومات الموبايل العلوية) */}
        <div className="relative flex w-full max-w-155 gap-6 md:gap-8">
          {/* المصغرات العمودية (تظهر في الديسكتوب فقط) */}
          <div className="hidden h-130 flex-col gap-4 rounded-2xl md:flex">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="border-primary/20 h-25 w-25 rounded-2xl border"
              />
            ))}
          </div>

          <div className="flex w-full flex-col gap-3">
            {/* معلومات المنتج العلوية وأزرار التفاعل (تظهر في الموبايل فقط) */}
            <div className="flex w-full flex-col gap-1 px-4 md:hidden md:px-0">
              <Skeleton className="h-4 w-32" /> {/* Category & Brand */}
              <Skeleton className="mt-1 h-7 w-3/4" /> {/* Product Name */}
              <div className="mt-1 flex w-full justify-between">
                <Skeleton className="h-6 w-16 rounded-sm" />{" "}
                {/* Rating Badge */}
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-md" />{" "}
                  {/* Mobile Fav Button */}
                  <Skeleton className="h-9 w-9 rounded-md" />{" "}
                  {/* Mobile Share Button */}
                </div>
              </div>
            </div>

            {/* الصورة الرئيسية (Main Image) */}
            <div className="w-full px-4 md:-mr-13 md:max-w-130 md:px-0">
              <Skeleton className="border-primary/20 aspect-square w-full rounded-2xl border md:h-130 md:max-w-130" />
            </div>

            {/* المصغرات الأفقية (تظهر في الموبايل فقط) */}
            <div className="no-scrollbar flex w-full flex-row gap-3 overflow-x-hidden px-4 md:hidden">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="border-primary/20 aspect-square h-25 w-25 shrink-0 rounded-xl border"
                />
              ))}
            </div>
          </div>
        </div>

        {/* اليمين: تفاصيل المنتج الأساسية للديسكتوب والموبايل */}
        <div className="flex h-fit w-full flex-col justify-between gap-4 px-4 md:h-130 md:px-0">
          <div className="w-full">
            {/* Category | Brand (الديسكتوب فقط) */}
            <Skeleton className="hidden h-5 w-48 md:block" />

            {/* Title (الديسكتوب فقط) */}
            <Skeleton className="mt-6 hidden h-12 w-3/4 md:block" />

            {/* Ratings (الديسكتوب فقط) */}
            <div className="mt-5 hidden items-center gap-2 md:flex">
              <Skeleton className="h-5 w-60" />
            </div>

            {/* Price (مشترك) */}
            <Skeleton className="mt-2 h-8 w-32 md:mt-6 md:h-10 md:w-40" />

            {/* Description (مشترك) */}
            <div className="mt-2 flex flex-col gap-1 md:mt-6 md:gap-2">
              <Skeleton className="h-4 w-24" /> {/* كلمة Description */}
              <Skeleton className="h-3 w-full md:h-4" />
              <Skeleton className="h-3 w-5/6 md:h-4" />
              <Skeleton className="h-3 w-4/6 md:h-4" />
            </div>

            {/* Stock indicator (مشترك) */}
            <Skeleton className="mt-2 h-5 w-32 md:mt-6" />
          </div>

          {/* الأزرار في الأسفل: Add to Cart & Desktop Favorites */}
          <div className="mt-4 flex w-full items-center justify-between gap-3 md:mt-0">
            {/* Add to Cart / Counter Button */}
            <Skeleton className="h-13 w-full rounded-lg md:h-20 md:rounded-2xl" />

            {/* Desktop Favorite Button (يختفي في الموبايل) */}
            <Skeleton className="hidden h-20 w-24 shrink-0 rounded-2xl md:block" />
          </div>
        </div>
      </div>

      {/* القسم السفلي: المنتجات المقترحة (MORE FROM CATEGORY) */}
      <div className="mt-6 flex flex-col gap-6 px-4 md:mt-15 md:gap-8 md:px-0">
        {/* Title */}
        <Skeleton className="h-6 w-64 md:h-8 md:w-100" />

        {/* Grid Product Cards (متجاوب مع الموبايل عمودين والديسكتوب بناءً على المساحة) */}
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
