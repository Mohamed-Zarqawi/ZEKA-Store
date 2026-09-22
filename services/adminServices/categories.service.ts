"use server";

import { supabase } from "@/lib/supabaseAdmin";
import { ReqCreateCategoryType, ResCategoryType } from "@/types/admin/category";
// -------------- get categories --------------

export const getCategories_Admin = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("* ,categoryRelatedProducts")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get category --------------

export const getCategory_Admin = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("categories")
    .select("* , categoryRelatedProducts")
    .eq("id", categoryId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by category --------------

export const getRelatedProductsByCategory_Admin = async (
  categoryId: number,
) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("category_id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- create category --------------

export const CreateCategory_Admin = async (body: ReqCreateCategoryType) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(body)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update products category --------------

export const updateCategoryProducts_Admin = async (
  categoryId: number,
  productIds: number[],
) => {
  const { data, error } = await supabase.rpc("update_category_products", {
    p_category_id: categoryId,
    p_product_ids: productIds,
  });

  if (error) {
    throw error;
  }

  return data;
};

// -------------- update category --------------

export const UpdateCategory_Admin = async (
  categoryId: number,
  updatedData: ResCategoryType,
) => {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedData)
    .eq("id", categoryId)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- delete category --------------

export const deleteCategory_Admin = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};
