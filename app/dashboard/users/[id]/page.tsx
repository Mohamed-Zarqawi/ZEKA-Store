"use client";

import ViewUserPage from "@/features/dashboard/pages/users/ViewUserPage";
import { useParams } from "next/navigation";

const ViewProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <ViewUserPage userId={id as string} />
    </div>
  );
};

export default ViewProduct;
