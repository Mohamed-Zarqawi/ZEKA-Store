"use server";

import { supabase } from "@/lib/supabaseAdmin";
import { ReqCreateCategoryType, ResCategoryType } from "@/types/admin/category";
// -------------- get categories --------------

export const getAdminCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("* ,categoryRelatedProducts")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// -------------- Get category --------------

export const getAdminCategory = async (categoryId: number) => {
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

export const getAdminRelatedProductsByCategory = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("category_id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- delete category --------------

export const deleteCategoryAdmin = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update products category --------------

export const updateCategoryProducts = async (
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

// -------------- create category --------------

export const CreateAdminCategory = async (body: ReqCreateCategoryType) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(body)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update category --------------

export const UpdateAdminCategory = async (
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
