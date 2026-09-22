"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/users");
  }, []);
  return <div></div>;
};

export default AdminPage;
