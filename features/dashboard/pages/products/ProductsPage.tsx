"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useGetProducts_Admin } from "./hooks/useProducts";

const ProductsPage = () => {
  // ------------------- States -------------------
  const storageKey = "productsView";

  // ------------------- Query Fetches -------------------
  // --- get products
  const { data: products, isLoading: isProductsLoading } =
    useGetProducts_Admin();

  // ------------------- Code -------------------
  return (
    <div className="w-full overflow-hidden">
      <div className="text-primary text-3xl">PRODUCTS MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={products?.data || []}
          createHref="/admin/products/create"
          storageKey={storageKey}
          isLoading={isProductsLoading}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
