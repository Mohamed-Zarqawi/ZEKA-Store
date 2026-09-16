import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CartPageSkeleton = () => {
  return (
    <div className="mx-4 animate-pulse md:mx-10">
      <div className="mt-8 flex flex-col gap-5 md:mt-15 md:gap-10">
        {/* Title */}
        <div className="text-primary text-xl md:text-3xl">
          YOUR SHOPPING BAG
        </div>

        {/* Main Layout Container */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-10">
          {/* Left Column: Cart Items List */}
          <div className="border-primary divide-primary/40 flex w-full flex-col divide-y overflow-hidden rounded-3xl border md:gap-6 md:divide-y-0 md:border-0">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="md:border-primary flex h-35 flex-col items-center bg-[#1a1a1a]/20 px-3 py-4 md:h-fit md:flex-row md:justify-between md:gap-5 md:rounded-3xl md:border md:p-7"
              >
                {/* Product Image & Details Container */}
                <div className="flex h-full w-full items-start gap-3 md:h-fit md:items-center md:gap-5">
                  {/* Image Skeleton */}
                  <Skeleton className="h-full w-23 shrink-0 rounded-2xl md:h-25 md:w-25" />

                  {/* Product Info & Actions */}
                  <div className="flex h-full w-full flex-col justify-between md:my-0 md:flex-row md:items-center">
                    {/* Title and Price */}
                    <div className="mt-1 flex flex-col gap-2 md:mt-0">
                      <Skeleton className="h-3.5 w-full md:h-5 md:w-48" />
                      <Skeleton className="h-3.5 w-32 md:h-5 md:w-48" />
                      <Skeleton className="h-3 w-12 md:h-4 md:w-16" />
                    </div>

                    {/* Counter and Favorite Controls */}
                    <div className="mb-1 flex items-center gap-2 md:mb-0 md:justify-between md:gap-3">
                      <Skeleton className="h-7 w-19 rounded-md md:h-8 md:w-21" />
                      <Skeleton className="h-7 w-7 rounded-md md:h-8 md:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="border-primary flex h-fit w-full shrink-0 flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-5 backdrop-blur-md md:sticky md:top-24 md:w-130 md:gap-8 md:p-7">
            {/* Header */}
            <div className="text-primary text-lg md:text-2xl">
              ORDER SUMMARY
            </div>

            {/* Subtotal & Shipping */}
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm md:text-base">SubTotal</div>
                <Skeleton className="h-4 w-12 md:w-16" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm md:text-base">Shipping Fee</div>
                <Skeleton className="h-4 w-14 md:w-14" />
              </div>
            </div>

            {/* Separator */}
            <div className="bg-primary h-px w-full" />

            {/* Total & Checkout Button */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="text-md md:text-xl">TOTAL</div>
                <Skeleton className="h-4 w-20 md:h-7 md:w-24" />
              </div>

              {/* Desktop Button Skeleton */}
              <Button
                variant={"none"}
                size={"none"}
                disabled={true}
                pendingText="PROCESSING..."
                className="bg-primary hover:bg-secondary hidden rounded-lg px-2 py-3 text-center text-sm transition-colors duration-300 disabled:opacity-70 md:block md:px-3 md:py-4 md:text-base"
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Floating Button Skeleton */}
        <Button
          variant={"none"}
          size={"none"}
          disabled={true}
          pendingText="PROCESSING..."
          className="bg-primary/60 border-primary sticky bottom-21 -mt-2 rounded-xl px-3 py-4 text-center text-sm backdrop-blur-md transition-colors duration-300 disabled:opacity-70 md:hidden"
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default CartPageSkeleton;

// import { Skeleton } from "@/components/ui/skeleton";

// export const CartPageSkeleton = () => {
//   return (
//     <div className="mx-10 animate-pulse">
//       <div className="mt-15 flex flex-col gap-10">
//         {/* Title Skeleton */}
//         <div className="text-primary text-3xl">YOUR SHOPPING BAG</div>

//         <div className="flex gap-10">
//           {/* Left Column: Cart Items List */}
//           <div className="flex w-full flex-col gap-6">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="border-primary/20 flex items-center justify-between gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-7 backdrop-blur-md"
//               >
//                 {/* Image + Product Info */}
//                 <div className="flex items-center gap-5">
//                   <Skeleton className="h-25 w-25 shrink-0 rounded-2xl" />
//                   <div className="flex flex-col gap-2">
//                     <Skeleton className="h-5 w-48" />
//                     <Skeleton className="h-4 w-16" />
//                   </div>
//                 </div>

//                 {/* Counter + Favorite Button */}
//                 <div className="flex items-center justify-between gap-3">
//                   <Skeleton className="h-8 w-21.5 rounded-md" />
//                   <Skeleton className="size-8 rounded-md" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Column: Order Summary Card */}
//           <div className="border-primary/20 sticky top-24 flex h-fit w-130 shrink-0 flex-col gap-8 rounded-3xl border bg-[#1a1a1a]/20 p-7 backdrop-blur-md">
//             {/* Header */}
//             <Skeleton className="h-6 w-40" />

//             {/* Subtotal & Shipping */}
//             <div className="flex flex-col gap-4">
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-4 w-16" />
//               </div>
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-4 w-14" />
//               </div>
//             </div>

//             {/* Separator */}
//             <div className="h-px w-full bg-zinc-800" />

//             {/* Total & Checkout Button */}
//             <div className="flex flex-col gap-6">
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-7 w-20" />
//                 <Skeleton className="h-7 w-24" />
//               </div>

//               <Skeleton className="h-14 w-full rounded-lg" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPageSkeleton;
