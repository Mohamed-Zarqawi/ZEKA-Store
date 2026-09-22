"use client";

import { DataTable } from "@/components/DataTable";

import { columns } from "./columns";
import { useGetAdminCategories } from "./hooks/useCategories";

const CategoriesPage = () => {
  // ------------------- States -------------------
  const storageKey = "productsView";

  // ------------------- Query Fetches -------------------
  // --- get products

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAdminCategories();
  // ------------------- Code -------------------
  return (
    <div className="w-full overflow-hidden">
      <div className="text-primary text-3xl">PRODUCTS MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={categories || []}
          createHref="/admin/products/create"
          storageKey={storageKey}
          isLoading={isCategoriesLoading}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
