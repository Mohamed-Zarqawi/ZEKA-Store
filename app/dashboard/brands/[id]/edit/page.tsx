"use client";

import { EditBrandPage } from "@/features/dashboard/pages/brands/EditBrandPage";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <EditBrandPage brandId={Number(productId)} />
    </div>
  );
};

export default Page;
