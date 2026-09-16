import { Skeleton } from "@/components/ui/skeleton";

const AccountMobilePageSkeleton = () => {
  return (
    <div className="mx-4 mt-6 flex h-fit flex-col gap-4">
      {/* 1. بطاقة الترحيب والمعلومات الشخصية */}
      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-5.5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-36" /> {/* Hello, Name ! */}
            <Skeleton className="h-3 w-48" /> {/* Email */}
          </div>
          <Skeleton className="h-9 w-16 rounded-md" /> {/* Edit Button */}
        </div>

        {/* قسم اكتمال الملف الشخصي (Slider) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="mx-auto h-2 w-full max-w-xs rounded-full" />
            <Skeleton className="h-6 w-10 rounded-md" />{" "}
            {/* Percentage Badge */}
          </div>
          <Skeleton className="h-3 w-64" /> {/* Description text */}
        </div>
      </div>

      {/* 2. بطاقات الأوامر والمفضلات العلوية (Orders & Wishlists) */}
      <div className="mt-1 flex flex-row items-start justify-center gap-3">
        <Skeleton className="border-primary h-20 w-full rounded-3xl border" />
        <Skeleton className="border-primary h-20 w-full rounded-3xl border" />
      </div>

      {/* 3. أقسام القوائم (My Account & Settings) */}
      {[1, 2].map((sectionIndex) => (
        <div key={sectionIndex}>
          {/* عنوان القسم */}
          <Skeleton className="mt-1 mb-3 ml-1 h-4 w-28" />

          {/* قائمة العناصر */}
          <div className="border-primary flex h-fit flex-col rounded-3xl border bg-[#1a1a1a]/20 px-5">
            {[1, 2, 3, 4].map((itemIndex, i, arr) => (
              <div
                key={itemIndex}
                className={`flex items-center justify-between py-5 ${
                  i !== arr.length - 1 ? "border-primary/20 border-b" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="size-5 rounded-md" /> {/* Icon */}
                  <Skeleton className="h-4 w-32" /> {/* Item Name */}
                </div>
                <Skeleton className="size-5 rounded-md" /> {/* Chevron Right */}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* فاصل */}
      <div className="border-primary/50 mx-auto my-2 flex w-40 items-center justify-center border-b"></div>

      {/* 4. زر تسجيل الخروج (Sign Out) */}
      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-3 backdrop-blur-md">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex w-full items-center gap-3 rounded-xl p-3">
            <Skeleton className="size-5 rounded-md" /> {/* Sign Out Icon */}
            <Skeleton className="h-4 w-24" /> {/* Sign Out Text */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMobilePageSkeleton;
