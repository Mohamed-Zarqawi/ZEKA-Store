"use client";

import { DataTable } from "@/components/DataTable";

import { columns } from "./columns";
import { useGetCategories_Admin } from "./hooks/useCategories";

const CategoriesPage = () => {
  // ------------------- States -------------------
  const storageKey = "categoriesView";

  // ------------------- Query Fetches -------------------
  // --- get products

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories_Admin();
  // ------------------- Code -------------------
  return (
    <div className="w-full overflow-hidden">
      <div className="text-primary text-3xl">CATEGORIES MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={categories || []}
          createHref="/admin/categories/create"
          storageKey={storageKey}
          isLoading={isCategoriesLoading}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
