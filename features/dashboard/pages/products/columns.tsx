"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { ActionCell } from "./ActionCell";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: { id: number; url: string }[];
  category: { id: number; name: string };
  brand: { id: number; name: string };
  featured: boolean;
  favoritesNumber: string | null;
  ordersNumber: string | null;
  isDeleted: boolean;
}

export const columns = (): ColumnDef<Product>[] => [
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

  // ---------------- image ----------------
  {
    accessorKey: "image",
    header: () => <div>Images</div>,

    cell: ({ row }) => {
      const images = row.original.images;
      const imageUrl = images?.[0]
        ? `${images[0]}`
        : "/images/placeholder.jpeg";

      return (
        <div>
          <img
            src={imageUrl}
            alt={row.original.name}
            className="h-12 w-12 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      );
    },
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
          Product Name
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

  // ---------------- category ----------------
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,

    cell: ({ row }) => (
      <div className="text-sm">{row.original.category?.name || "—"}</div>
    ),
  },

  // ---------------- brand ----------------
  {
    accessorKey: "brand",
    header: () => <div className="text-left">Brand</div>,

    cell: ({ row }) => (
      <div className="text-sm">{row.original.brand?.name || "—"}</div>
    ),
  },

  // ---------------- price ----------------
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Price
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return <div className="pl-4.5 text-sm">${price.toFixed(2)}</div>;
    },
  },

  // ---------------- orders number ----------------
  {
    accessorKey: "ordersNumber",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Orders Number
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      return (
        <div className="pl-4.5 text-sm">{row.getValue("ordersNumber")}</div>
      );
    },
  },

  // ---------------- favorites number ----------------
  {
    accessorKey: "favoritesNumber",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Favorites Number
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      return (
        <div className="pl-4.5 text-sm">
          {row.getValue("favoritesNumber") || "_"}
        </div>
      );
    },
  },

  // ---------------- stock ----------------
  {
    accessorKey: "stock",
    header: () => <div>Stock</div>,

    cell: ({ row }) => {
      const stock = row.original.stock;
      const isAvailable = stock > 0;
      return (
        <Badge variant="outline">
          {isAvailable ? `${stock} In stock` : "Out of stock"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          State
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const state = row.original.isDeleted;
      const isAvailable = state == false;
      return (
        <div className="flex justify-center">
          <Badge
            className={`inline-flex items-center border tracking-wider ${
              isAvailable
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {isAvailable ? `Active` : "Deleted"}
          </Badge>
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
      const href = `/dashboard/products/${id}`;
      return <ActionCell product={row.original} viewHref={href} />;
    },
  },
];
