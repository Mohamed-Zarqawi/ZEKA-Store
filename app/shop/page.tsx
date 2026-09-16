import { Suspense } from "react";
import ShopPage from "@/features/shop/pages/shop/ShopPage";

const Shop = () => {
  return (
    <Suspense fallback={null}>
      <ShopPage />
    </Suspense>
  );
};

export default Shop;
