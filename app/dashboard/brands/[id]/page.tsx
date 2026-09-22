"use client";

import { ViewBrandsPage } from "@/features/dashboard/pages/brands/ViewBrandPage";
import { useParams } from "next/navigation";

const ViewProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <ViewBrandsPage brandId={Number(id)} />
    </div>
  );
};

export default ViewProduct;
