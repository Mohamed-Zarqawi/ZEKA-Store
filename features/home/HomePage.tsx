"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/features/shop/components/ProductCard";
import { ProductType } from "@/types/shop/product";
import Link from "next/link";
import { ProductCardSkeleton } from "../shop/components/ProductCardSkilton";
import { useGetShopProducts } from "../shop/pages/shop/hooks/useShop";

const HomePage = () => {
  const { data: products, isLoading: isProductsLoading } = useGetShopProducts();

  return (
    <div className="md:mx-10">
      {/* body */}

      <div className="flex flex-col">
        {/* first slide */}

        <div className="relative mt-10 flex h-75 items-start justify-between gap-6 overflow-x-hidden md:mt-15 md:h-fit md:flex-row md:items-center md:overflow-visible">
          <div className="z-20 flex flex-col gap-6 px-6 md:static md:gap-10 md:px-0">
            <div className="text-primary font-bold md:text-xl">
              NEW COLLECTION
            </div>

            <div className="flex flex-col items-start gap-6 md:gap-10">
              <div className="text-[26px] md:text-4xl lg:text-6xl">
                PUSH YOUR <span className="text-primary">LIMITS</span> FURTHER
              </div>
              <div className="w-[90%] text-[12px] md:mr-0 md:w-lg md:text-base">
                High-performance equipment designed for athletes who never
                settle for second place.
              </div>
            </div>
            <Button variant="default" asChild className="w-fit">
              <Link href="/shop">Explore Shop</Link>
            </Button>
          </div>
          <div>
            <img
              src="/images/hamester.jpeg"
              className="shadow-primary hidden w-175 min-w-70 rounded-[65px] shadow-[0_0_50px] md:block"
            />
            <img
              src="/images/hamester1.PNG"
              className="shadow-primary absolute -right-6 bottom-2 block w-48 *:z-10 md:hidden"
            />
          </div>
        </div>

        {/* second slide */}
        <div className="mx-4 mt-5 flex flex-col gap-10 md:mx-0 md:mt-20">
          <div className="flex items-end justify-between">
            <div className="text-primary text-lg md:text-3xl">
              MOST PRODUCT POPULAR
            </div>
          </div>
          {isProductsLoading ? (
            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-6">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : (
            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-6">
              {products?.data &&
                products?.data?.length > 0 &&
                products?.data?.map((product: ProductType) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;

// "use client";

// import { Button } from "@/components/ui/button";
// import ProductCard from "@/features/shop/components/ProductCard";
// import { ProductType } from "@/types/shop/product";
// import { ProductCardSkeleton } from "../shop/components/ProductCardSkilton";
// import { useGetShopProducts } from "../shop/pages/shop/hooks/useShop";
// import Link from "next/link";

// const HomePage = () => {
//   const { data: products, isLoading: isProductsLoading } = useGetShopProducts();

//   return (
//     <div className="mx-4 md:mx-10">
//       {/* body */}

//       <div className="flex flex-col">
//         {/* first slide */}

//         <div className="mt-10 flex items-center justify-between gap-2 md:mt-15 md:gap-0">
//           <div className="flex flex-col gap-4 md:gap-15 md:gap-15">
//             <div className="text-primary text-xs font-bold md:text-base md:text-base">
//               NEW COLLECTION
//             </div>

//             <div className="flex flex-col gap-5 md:gap-10">
//               <div className="text-lg md:text-4xl md:text-6xl">
//                 PUSH YOUR <span className="text-primary">LIMITS</span> FURTHER
//               </div>
//               <div className="flex flex-col gap-3 md:gap-15">
//                 <div className="text-xs md:flex md:text-base">
//                   High-performance equipment designed for athletes who{" "}
//                   <br className="md:flex" /> never settle for second place.
//                 </div>

//                 <div>
//                   <Button variant="default" asChild>
//                     <Link href="/shop">Explore Shop</Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <img
//               src="/images/hamester.jpeg"
//               className="shadow-primary w-50 rounded-2xl shadow-[0_0_10px] md:w-175 md:rounded-[65px] md:shadow-[0_0_50px]"
//             />
//           </div>
//         </div>
//         {/* second slide */}
//         <div className="mt-20 flex flex-col gap-10">
//           <div className="flex items-end justify-between">
//             <div className="text-primary text-lg md:text-3xl">
//               MOST PRODUCT POPULAR
//             </div>
//           </div>
//           {isProductsLoading ? (
//             <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 sm:gap-6">
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//             </div>
//           ) : (
//             <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 sm:gap-6">
//               {products?.data &&
//                 products?.data?.length > 0 &&
//                 products?.data?.map((product: ProductType) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default HomePage;
