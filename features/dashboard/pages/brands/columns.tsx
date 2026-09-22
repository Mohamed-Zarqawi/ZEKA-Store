"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { ActionCell } from "./ActionCell";

export interface Brand {
  id: number;
  name: string;
  brandRelatedProducts: number;
  created_at: string;
}

export const columns = (): ColumnDef<Brand>[] => [
  // ---------------- id ----------------

  {
    accessorKey: "id",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Id
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("id"));
            toast.success("Copied to clipboard", {});
          }}
        >
          {row.getValue("id")}
        </Button>
      </div>
    ),
  },

  // ---------------- name ----------------
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Brand Name
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("name"));
            toast.success("Copied to clipboard", {});
          }}
        >
          {row.getValue("name") || "_"}
        </Button>
      </div>
    ),
  },

  // ---------------- related products ----------------
  {
    accessorKey: "brandRelatedProducts",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Related Products
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      return (
        <div className="pl-4.5 text-sm">
          {row.getValue("brandRelatedProducts") || "-"}
        </div>
      );
    },
  },

  // ---------------- actions ----------------
  {
    id: "actions",
    header: () => <div className="mr-4 flex justify-end">Actions</div>,

    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      const href = `/admin/brands/${id}`;
      return <ActionCell brand={row.original} viewHref={href} />;
    },
  },
];
