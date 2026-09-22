"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddressType } from "@/types/profile/address";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { ActionCell } from "./ActionCell";

export interface Users {
  id: string;
  created_at: string;
  role: string;
  is_blocked: boolean;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  addresses: AddressType[];
  phoneCode: string;
  phoneNumber: string;
  orders_number: string;
  favorites_number: number;
}

export const columns = (): ColumnDef<Users>[] => [
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
          {row.getValue<string>("id")
            ? `${row.getValue<string>("id").slice(0, 11) + "..."}`
            : "—"}
        </Button>
      </div>
    ),
  },

  // ---------------- first name ----------------
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          First Name
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("first_name"));
            toast.success("Copied to clipboard", {});
          }}
        >
          {row.getValue("first_name") || "-"}
        </Button>
      </div>
    ),
  },

  // ---------------- last name ----------------
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Last Name
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("last_name"));
            toast.success("Copied to clipboard", {});
          }}
        >
          {row.getValue("last_name") || "-"}
        </Button>
      </div>
    ),
  },

  // ---------------- gender ----------------

  {
    accessorKey: "gender",
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Gender
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const gender = row.original.gender;

      return <div className="flex justify-center">{gender || "-"}</div>;
    },
  },

  // ---------------- email ----------------
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Email
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("email"));
            toast.success("Copied to clipboard", {});
          }}
        >
          {row.getValue("email") || "-"}
        </Button>
      </div>
    ),
  },

  // ---------------- phone number ----------------s
  {
    accessorKey: "phoneNumber",
    header: () => <div>Phone Number</div>,

    cell: ({ row }) => {
      const code = row.original.phoneCode;
      const number = row.original.phoneNumber;
      const fullNumber = code && number ? `+${code}-${number}` : "-";
      return (
        <div>
          <Button
            variant="link"
            onClick={() => {
              navigator.clipboard.writeText(fullNumber);
              toast.success("Copied to clipboard", {});
            }}
          >
            {fullNumber}
          </Button>
        </div>
      );
    },
  },

  // ---------------- addresses ----------------
  {
    accessorKey: "addresses",
    header: ({}) => (
      <div>
        <Button variant="ghost" className="hover:text-secondary text-xs">
          Addresses
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      const addressesCount = row.original.addresses?.length;
      return (
        <div className="text-center text-sm">
          {addressesCount > 0 ? addressesCount : "-"}
        </div>
      );
    },
  },

  // ---------------- orders number ----------------
  {
    accessorKey: "orders_number",
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
        <div className="text-center text-sm">
          {row.getValue("orders_number") || "-"}
        </div>
      );
    },
  },

  // ---------------- favorites number ----------------
  {
    accessorKey: "favorites_number",
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
        <div className="text-center text-sm">
          {row.getValue("favorites_number") || "-"}
        </div>
      );
    },
  },

  // ---------------- login at ----------------

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Login at
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      // 1. تحويل النص إلى كائن تاري
      const date = new Date(row.getValue("created_at"));

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="flex flex-col items-center justify-center pl-4.5 text-center text-sm">
          <span>{formattedDate}</span>
          <span className="text-muted-foreground mt-0.5 text-xs">
            {formattedTime}
          </span>
        </div>
      );
    },
  },

  // ---------------- is blocked ----------------

  {
    accessorKey: "is_blocked",
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
      const state = row.original.is_blocked;
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

  // ---------------- role ----------------

  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Role
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <div className="flex justify-center">
          {role == "admin" ? (
            <Badge variant="outline">Admin</Badge>
          ) : (
            <Badge variant="outline">User</Badge>
          )}
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
      const href = `/admin/users/${id}`;
      return <ActionCell user={row.original} viewHref={href} />;
    },
  },
];
