"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useGetUsers_Admin } from "./hooks/useUser";

const UsersPage = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsers_Admin();
  const storageKey = "usersView";
  console.log(users);

  return (
    <div>
      <div className="text-primary text-3xl">USERS MANAGEMENT</div>

      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={users || []}
          createHref="/dashboard/users/create"
          storageKey={storageKey}
          isLoading={isUsersLoading}
        />
      </div>
    </div>
  );
};

export default UsersPage;
