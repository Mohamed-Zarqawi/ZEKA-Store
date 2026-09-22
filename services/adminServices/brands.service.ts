"use server";

import { supabase } from "@/lib/supabaseAdmin";
import { ReqCreateBrandType, ResBrandType } from "@/types/admin/brand";
// -------------- get brands --------------

export const getAdminBrands = async () => {
  const { data, error } = await supabase
    .from("brands")
    .select("* ,brandRelatedProducts")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// -------------- Get brand --------------

export const getAdminBrand = async (brandId: number) => {
  const { data, error } = await supabase
    .from("brands")
    .select("* , brandRelatedProducts")
    .eq("id", brandId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by brand --------------

export const getAdminRelatedProductsByBrand = async (brandId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("brand_id", brandId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- delete Category Admin --------------

export const deleteBrandAdmin = async (brandId: number) => {
  const { data, error } = await supabase
    .from("brands")
    .delete()
    .eq("id", brandId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update products brand --------------

export const updateBrandProducts = async (
  brandId: number,
  productIds: number[],
) => {
  const { data, error } = await supabase.rpc("update_brand_products", {
    p_brand_id: brandId,
    p_product_ids: productIds,
  });

  if (error) {
    throw error;
  }

  return data;
};

// -------------- create brand --------------

export const CreateAdminBrand = async (body: ReqCreateBrandType) => {
  const { data, error } = await supabase.from("brands").insert(body).select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update category --------------

export const UpdateAdminBrand = async (
  brandId: number,
  updatedData: ResBrandType,
) => {
  const { data, error } = await supabase
    .from("brands")
    .update(updatedData)
    .eq("id", brandId)
    .select();

  if (error) {
    throw error;
  }
  return data;
};
