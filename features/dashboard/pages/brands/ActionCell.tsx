"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Brand } from "./columns";
import { useDeleteBrandAdmin } from "./hooks/useBrands";

interface ActionCellProps {
  brand: Brand;
  viewHref: string;
}

export const ActionCell = ({ brand, viewHref }: ActionCellProps) => {
  const router = useRouter();
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrandAdmin();

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
          router.push(`/admin/brands/${brand.id}/edit`);
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
          deleteBrand(brand.id);
        }}
        className="border-border cursor-pointer border p-2"
      >
        <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
      </Button>
    </div>
  );
};
