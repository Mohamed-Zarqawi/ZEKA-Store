"use client";

import EditUserPage from "@/features/dashboard/pages/users/EditUserPage";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const userId = params.id;

  return (
    <div>
      <EditUserPage userId={String(userId)} />
    </div>
  );
};

export default Page;
