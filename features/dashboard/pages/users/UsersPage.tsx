"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useGetUsersAdmin } from "./hooks/useUser";

const UsersPage = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsersAdmin();
  const storageKey = "usersView";
  console.log(users);

  return (
    <div>
      <div className="text-primary text-3xl">USERS MANAGEMENT</div>

      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={users || []}
          createHref="/admin/products/create"
          storageKey={storageKey}
          isLoading={isUsersLoading}
        />
      </div>
    </div>
  );
};

export default UsersPage;
