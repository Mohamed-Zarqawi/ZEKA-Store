"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Eye, ShieldCheck, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Users } from "./columns";
import { useDeleteUserAdmin, useToggleUserBlockAdmin } from "./hooks/useUser";

interface ActionCellProps {
  user: Users;
  viewHref: string;
}

export const ActionCell = ({ user, viewHref }: ActionCellProps) => {
  const userId = user.id;
  const router = useRouter();
  const { mutate: toggleBlock, isPending: isBlocking } =
    useToggleUserBlockAdmin();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserAdmin();

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Block Button */}

      {/* View button  */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => {
          router.push(viewHref);
        }}
        className="border-border cursor-pointer border p-2"
        disabled={isDeleting}
      >
        <Eye className="h-4 w-4 hover:cursor-pointer" />
      </Button>

      {/* Edit Button */}
      <Button
        variant="outline"
        size="icon-sm"
        className="border-border cursor-pointer border p-2"
        onClick={() => {
          router.push(`/admin/users/${user.id}/edit`);
        }}
        disabled={isDeleting}
      >
        <Edit className="h-4 w-4" />
      </Button>

      {/* block Button */}
      <Button
        variant="outline"
        onClick={() => toggleBlock(userId)}
        size="icon-sm"
        className={`cursor-pointer border ${
          user.is_blocked
            ? "border-border text-emerald-500 hover:bg-emerald-500/10"
            : "border-border hover:bg-destructive/10 text-destructive"
        }`}

        isPending={isBlocking}
      >
        {user.is_blocked ? (
          <ShieldCheck />
        ) : (
          <ShieldX className="text-destructive hover:cursor-pointer" />
        )}
      </Button>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => deleteUser(user.id)}
        isPending={isDeleting}
        className="border-border cursor-pointer border p-2"
      >
        <IconTrash className="text-destructive hover:cursor-pointer" />
      </Button>
    </div>
  );
};
