import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export const UpdateAddressSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* عنوان الصفحة الرئيسي */}
      <div className="text-primary text-3xl">Edit Address</div>

      {/* القسم الأول: تفاصيل العنوان (Address Details) */}
      <div className="border-primary/30 mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
        <div className="text-lg font-semibold">Address Details</div>

        <div className="mt-5 flex flex-wrap gap-6">
          {/* عنوان العنوان (Address Title Buttons) */}
          <div className="flex flex-col">
            <FieldLabel
              htmlFor="addressTitle"
              className="text-primary mb-2 text-sm"
            >
              Address Title
            </FieldLabel>
            <div id="addressTitle" className="flex gap-3">
              <Button type="button" variant={"outline"}>
                Home
              </Button>
              <Button type="button" variant={"outline"}>
                Work
              </Button>
              <Button type="button" variant={"outline"}>
                Other
              </Button>
            </div>
          </div>

          {/* Address Line Input */}
          <div className="flex w-full flex-col gap-2">
            <FieldLabel className="text-primary text-sm">
              Address Line
            </FieldLabel>
            <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
          </div>

          {/* Address Details Input */}
          <div className="flex w-full flex-col gap-2">
            <FieldLabel className="text-primary text-sm">
              Address Details
            </FieldLabel>
            <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
          </div>

          {/* Country, City & ZIP Row */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-primary text-sm">
                Country<span className="text-destructive">*</span>
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-primary text-sm">
                City<span className="text-destructive">*</span>
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-primary text-sm">ZIP Code</FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>
          </div>
        </div>
      </div>

      {/* القسم الثاني: تفاصيل المستلم (Receiver Details) */}
      <div className="border-primary/30 mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
        <div className="text-lg font-semibold">Receiver Details</div>

        <div className="mt-5 flex flex-wrap gap-6">
          {/* Full Name Input */}
          <div className="flex w-full flex-col gap-2 sm:w-96">
            <FieldLabel className="text-primary text-sm">Full Name</FieldLabel>
            <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
          </div>

          {/* Phone Code & Phone Number */}
          <div className="flex w-full gap-3">
            <div className="flex w-32 flex-col gap-2">
              <FieldLabel className="text-primary text-sm">
                Country Code
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-96">
              <FieldLabel className="text-primary text-sm">
                Phone Number
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>
          </div>
        </div>
      </div>

      {/* زر الحفظ والتحديث (Submit Button) */}
      <div className="mt-6 flex justify-end">
        <Button
          size={"lg"}
          disabled={true}
          className="mt-6 flex justify-center rounded-lg p-6 text-base outline-none hover:cursor-pointer"
        >
          Update Address
        </Button>
      </div>
    </div>
  );
};

export default UpdateAddressSkeleton;
