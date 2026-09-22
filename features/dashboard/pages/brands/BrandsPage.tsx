"use client";

import { DataTable } from "@/components/DataTable";

import { columns } from "./columns";
import { useGetAdminBrands } from "./hooks/useBrands";

const BrandsPage = () => {
  // ------------------- States -------------------
  const storageKey = "brandsView";

  // ------------------- Query Fetches -------------------
  // --- get products

  const { data: brands, isLoading: isBrandsLoading } = useGetAdminBrands();
  // ------------------- Code -------------------
  return (
    <div className="w-full overflow-hidden">
      <div className="text-primary text-3xl">CATEGORIES MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={brands || []}
          createHref="/admin/brands/create"
          storageKey={storageKey}
          isLoading={isBrandsLoading}
        />
      </div>
    </div>
  );
};

export default BrandsPage;
