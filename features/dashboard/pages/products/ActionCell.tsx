"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "./columns";
import { useDeleteAdminProduct } from "./hooks/useProducts";

interface ActionCellProps {
  product: Product;
  viewHref: string;
}

export const ActionCell = ({ product, viewHref }: ActionCellProps) => {
  const router = useRouter();
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteAdminProduct();

  const handleDelete = () => {
    if (!product.id) return;

    deleteProduct(product.id, {
      onSuccess: () => {
        toast.success("Product deleted successfully!", {});
      },
      onError: (error) => {
        toast.error("Failed to delete product!", {});
        console.error(error);
      },
    });
  };

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
          router.push(`/admin/products/${product.id}/edit`);
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
        onClick={handleDelete}
        className="border-border cursor-pointer border p-2"
      >
        <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
      </Button>
    </div>
  );
};
