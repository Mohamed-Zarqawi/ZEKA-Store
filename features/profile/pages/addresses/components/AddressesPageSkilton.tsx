import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export const AddressesPageSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* عنوان الصفحة */}
      <div className="text-primary text-2xl md:text-3xl">ADDRESSES</div>
      <div className="text-muted-foreground mt-2 text-xs">
        Manage your saved addresses for fast and easy checkout across our
        marketplaces
      </div>

      {/* الحاوية الرئيسية */}
      <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
        {/* شريط الهيدر (العنوان + زر إضافة عنوان) */}
        <div className="mb-5 flex items-center justify-between">
          <div className="text-base">Saved Addresses</div>
          <Button className="hidden md:block">Add New</Button>
        </div>

        {/* شبكة العناوين (Grid of 2) */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            size={"sm"}
            variant={"none"}
            className="border-primary flex h-11 items-center justify-center border-dashed md:hidden"
          >
            <Plus />
            Add New
          </Button>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-card border-border flex w-full flex-col gap-4 rounded-md border px-4 py-3 md:py-5"
            >
              {/* شريط بطاقة العنوان العلوي */}
              <div className="flex items-center justify-between">
                <Skeleton className="bg-primary/20 h-5 w-19 rounded-md" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-12 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>

              {/* خط الفاصل */}
              <Skeleton className="bg-primary/20 h-px w-full md:mt-0.5 md:mb-1" />

              {/* تفاصيل العنوان */}
              <div className="flex flex-col gap-4">
                <Skeleton className="bg-primary/20 h-4 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressesPageSkeleton;
