import { supabase } from "@/lib/supabase";
import { ReqCreateProductType } from "@/types/admin/product";

// -------------- getProducts --------------

export const getAdminProducts = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  const from = (page - 1) * 12;
  const to = from + 12 - 1;

  let query = supabase
    .from("products")

    .select(
      "* , ordersNumber, favoritesNumber, category:categories(*) , brand:brands(*) ",
      {
        count: "exact",
      },
    );

  if (categories.length > 0) {
    query = query.in("category_id", categories);
  }

  if (brands.length > 0) {
    query = query.in("brand_id", brands);
  }

  // query = query.gte("price", minPrice).lte("price", maxPrice).range(from, to);
  query = query.gte("price", minPrice).lte("price", maxPrice);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }
  if (data) {
    console.log(data);
  }

  return {
    data: data ?? [],
    meta: {
      pagination: {
        page,
        pageSize: 12,
        pageCount: Math.ceil((count ?? 0) / 12),
        total: count ?? 0,
      },
    },
  };
};

// -------------- GetProduct --------------

export const getAdminProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("id", productId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- UpdatProduct --------------

export const UpdateAdminProduct = async (
  productId: string,
  updatedData: Record<string, any> = {},
) => {
  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", productId)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- DeleteProduct --------------

export const ToggleDeleteAdminProduct = async (productId: string) => {
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("isDeleted")
    .eq("id", productId)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  if (!product) {
    throw new Error("Product not found");
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      isDeleted: !product.isDeleted,
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// -------------- CreateProduct --------------

export const CreateAdminProduct = async (body: ReqCreateProductType) => {
  const { data, error } = await supabase.from("products").insert(body).select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get categories --------------

export const getAdminCategories = async () => {
  const { data, error } = await supabase.from("categories").select("id, name");

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get brands --------------

export const getAdminBrands = async () => {
  const { data, error } = await supabase.from("brands").select("id , name");

  if (error) {
    throw error;
  }
  return data;
};
