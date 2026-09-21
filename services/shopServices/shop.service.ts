import { supabase } from "@/lib/supabase";

// -------------- getProducts --------------

export const getShopProducts = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
  search: string = "",
) => {
  const from = (page - 1) * 12;
  const to = from + 12 - 1;

  let query = supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*) ", {
      count: "exact",
    })
    .eq("isDeleted", false);

  if (categories.length > 0) {
    query = query.in("category_id", categories);
  }

  if (brands.length > 0) {
    query = query.in("brand_id", brands);
  }

  if (search.trim() !== "") {
    query = query.ilike("name", `%${search}%`);
  }

  query = query
    .gte("price", minPrice)
    .lte("price", maxPrice)
    .range(from, to)
    .order("stock", { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    throw error;
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

// -------------- get one product --------------

export const getShopProduct = async (productId: number) => {
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

// -------------- get products prices --------------

export const getProductsPrices = async () => {
  const { data, error } = await supabase.from("products").select("price");

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get categories --------------

export const getShopCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("name , id")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get brands --------------

export const getShopBrands = async () => {
  const { data, error } = await supabase
    .from("brands")
    .select("name , id")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by category --------------

export const getShopRelatedProductsByCategory = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("category_id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by brand --------------

export const getShopRelatedProductsByBrand = async (brandId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("brand_id", brandId);

  if (error) {
    throw error;
  }
  return data;
};
