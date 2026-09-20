"use client";

import EditProductPage from "@/features/dashboard/pages/products/EditProductPage";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <EditProductPage productId={String(productId)} />
    </div>
  );
};

export default Page;
