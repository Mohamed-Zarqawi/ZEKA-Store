"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { IconPlusFilled } from "@tabler/icons-react";
import { Columns3, Loader2, Rows3 } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createHref: string;
  storageKey?: string;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createHref,
  storageKey = "table_column_visibility",
  isLoading,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const isMountedVisibility = React.useRef(false);
  const isMountedPageSize = React.useRef(false);

  const pageSizeStorageKey = `${storageKey}_page_size`;

  useEffect(() => {
    const savedVisibility = localStorage.getItem(storageKey);
    if (savedVisibility) {
      try {
        setColumnVisibility(JSON.parse(savedVisibility));
      } catch (e) {
        console.error("Failed to parse column visibility from localStorage", e);
      }
    }

    const savedPageSize = localStorage.getItem(pageSizeStorageKey);
    if (savedPageSize) {
      const parsedSize = Number(savedPageSize);
      if (!isNaN(parsedSize)) {
        setPagination((prev) => ({ ...prev, pageSize: parsedSize }));
      }
    }
  }, [storageKey, pageSizeStorageKey]);

  useEffect(() => {
    if (!isMountedVisibility.current) {
      isMountedVisibility.current = true;
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
  }, [columnVisibility, storageKey]);

  useEffect(() => {
    if (!isMountedPageSize.current) {
      isMountedPageSize.current = true;
      return;
    }
    localStorage.setItem(pageSizeStorageKey, pagination.pageSize.toString());
  }, [pagination.pageSize, pageSizeStorageKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: setPagination,

    state: {
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden">
      <div className="flex w-full items-center justify-end gap-2">
        {/* Create Button  */}
        <div>
          <Button
            size="lg"
            variant="default"
            onClick={() => router.push(createHref)}
            className="rounded-lg px-3"
          >
            <IconPlusFilled />
          </Button>
        </div>

        {/* Search  */}
        <div className="flex items-center">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 py-2"
          />
        </div>

        {/* Column Filter */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="outline" className="rounded-lg px-3">
                <Columns3 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Rows Per Page Filter */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="outline" className="rounded-lg px-3">
                <Rows3 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <DropdownMenuCheckboxItem
                  key={pageSize}
                  checked={table.getState().pagination.pageSize === pageSize}
                  onCheckedChange={() => table.setPageSize(pageSize)}
                >
                  {pageSize}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-primary w-full overflow-x-hidden rounded-3xl border bg-[#1a1a1a]/20">
        {/* Base Table Container with Horizontal Scroll */}
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      table.getVisibleFlatColumns().length || columns.length
                    }
                    className="h-32 text-center"
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      table.getVisibleFlatColumns().length || columns.length
                    }
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {!table.getCanNextPage() && !table.getCanPreviousPage() ? null : (
          <div className="flex items-center justify-end space-x-2 p-3.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="inline-flex items-center justify-center leading-none"
            >
              previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="inline-flex items-center justify-center leading-none"
            >
              next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
