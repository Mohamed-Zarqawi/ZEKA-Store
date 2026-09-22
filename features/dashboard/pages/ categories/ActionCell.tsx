"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category } from "./columns";
import { useDeleteCategory_Admin } from "./hooks/useCategories";

interface ActionCellProps {
  category: Category;
  viewHref: string;
}

export const ActionCell = ({ category, viewHref }: ActionCellProps) => {
  const router = useRouter();
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory_Admin();

  return (
    <div className="mr-4 flex items-center justify-end gap-2">
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
          router.push(`/admin/categories/${category.id}/edit`);
        }}
        disabled={isDeleting}
      >
        <Edit className="h-4 w-4" />
      </Button>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        isPending={isDeleting}
        disabled={isDeleting}
        onClick={() => {
          deleteCategory(category.id);
        }}
        className="border-border cursor-pointer border p-2"
      >
        <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
      </Button>
    </div>
  );
};
