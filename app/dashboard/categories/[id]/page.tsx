"use client";

import { ViewCategoryPage } from "@/features/dashboard/pages/ categories/ViewCategoryPage";
import { useParams } from "next/navigation";

const ViewProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <ViewCategoryPage categoryId={Number(id)} />
    </div>
  );
};

export default ViewProduct;
