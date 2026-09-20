"use client";

import { ViewProductPage } from "@/features/dashboard/pages/products/ViewProductPage";
import { useParams } from "next/navigation";

const ViewProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <ViewProductPage productId={id as string} />
    </div>
  );
};

export default ViewProduct;
