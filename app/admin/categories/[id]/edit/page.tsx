"use client";

import { EditCategoryPage } from "@/features/dashboard/pages/ categories/EditCategoryPage";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <EditCategoryPage categoryId={Number(productId)} />
    </div>
  );
};

export default Page;
