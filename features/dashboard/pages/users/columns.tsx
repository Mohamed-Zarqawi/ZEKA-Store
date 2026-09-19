// "use client";

// import { Button } from "@/components/ui/button";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import { toast } from "sonner";
// import { ActionCell } from "./ActionCell";

// export interface Users {
//   id: string;
//   documentId: string;
//   firstName: string;
//   lastName: string;
//   name: string;
//   email: string;
//   firstLogin: string;
//   username: string;
//   blocked: boolean;
// }

// export const columns = (
//   onToggleBlock: (userId: string, currentStatus: boolean) => void,
//   onDelete: (documentId: string) => void,
// ): ColumnDef<Users>[] => [
//   {
//     accessorKey: "id",
//     header: ({ column }) => (
//       <div className="flex justify-start">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="hover:bg-transparent -ml-3 hover:text-primary text-sm tracking-wider"
//         >
//           Id
//           <ArrowUpDown />
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex justify-start items-center gap-2">
//         <Button
//           variant="link"
//           onClick={() => {
//             navigator.clipboard.writeText(row.getValue<string>("id"));
//             toast.success("Copied to clipboard", {
//               position: "bottom-right",
//               richColors: true,
//             });
//           }}
//           className="-ml-3 text-foreground/90 hover:text-primary text-sm tracking-wider"
//         >
//           {row.getValue("id")}
//         </Button>
//       </div>
//     ),
//   },

//   {
//     accessorKey: "documentId",
//     header: ({ column }) => (
//       <div className="ml-1 text-sm text-left tracking-wider">Document Id</div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex justify-start items-center gap-2">
//         <Button
//           variant="link"
//           onClick={() => {
//             navigator.clipboard.writeText(row.getValue<string>("documentId"));
//             toast.success("Copied to clipboard", {
//               position: "bottom-right",
//               richColors: true,
//             });
//           }}
//           className="-ml-3 text-foreground/90 hover:text-primary text-sm tracking-wider"
//         >
//           {row.getValue<string>("documentId")
//             ? `${row.getValue<string>("documentId").slice(0, 11)}`
//             : "—"}
//         </Button>
//       </div>
//     ),
//   },

//   {
//     accessorKey: "username",
//     header: ({ column }) => (
//       <div className="flex justify-start">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="hover:bg-transparent -ml-3 hover:text-primary text-sm tracking-wider"
//         >
//           Username
//           <ArrowUpDown />
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex justify-start items-center gap-2">
//         <Button
//           variant="link"
//           onClick={() => {
//             navigator.clipboard.writeText(row.getValue("username"));
//             toast.success("Copied to clipboard", {
//               position: "bottom-right",
//               richColors: true,
//             });
//           }}
//           className="-ml-3 text-foreground/90 hover:text-primary text-sm tracking-wider"
//         >
//           {row.getValue("username")}
//         </Button>
//       </div>
//     ),
//     enableHiding: false,
//   },

//   {
//     accessorKey: "email",
//     header: () => (
//       <div className="ml-1 text-sm text-left tracking-wider">Email</div>
//     ),
//     cell: ({ row }) => (
//       <div className="text-left">
//         <Button
//           variant="link"
//           onClick={() => {
//             navigator.clipboard.writeText(row.getValue("email"));
//             toast.success("Copied to clipboard", {
//               position: "bottom-right",
//               richColors: true,
//             });
//           }}
//           className="-ml-3 text-foreground/90 hover:text-primary text-sm tracking-wider"
//         >
//           {row.original.email || "—"}
//         </Button>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "blocked",
//     header: ({ column }) => (
//       <div className="flex justify-start">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="hover:bg-transparent -ml-3 hover:text-primary text-sm tracking-wider"
//         >
//           State
//           <ArrowUpDown />
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => {
//       const state = row.original.blocked;
//       const isAvailable = state == false;
//       return (
//         <div className="flex justify-center">
//           <span
//             className={`inline-flex items-center px-1.5 py-1 rounded-full text-xs -black tracking-wider border ${
//               isAvailable
//                 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
//                 : "bg-destructive/10 text-destructive border-destructive/20"
//             }`}
//           >
//             {isAvailable ? `Active` : "Blocked"}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     header: () => (
//       <div className="text-xs text-end tracking-wider">Actions</div>
//     ),
//     cell: ({ row }) => {
//       return (
//         <ActionCell
//           user={row.original}
//           toggleBlock={(userId, currentStatus) =>
//             onToggleBlock?.(userId, currentStatus)
//           }
//           onDelete={onDelete}
//         />
//       );
//     },
//   },
// ];
