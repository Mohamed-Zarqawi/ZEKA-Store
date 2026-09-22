"use server";

import { supabase } from "@/lib/supabaseAdmin";
import { ReqCreateBrandType, ReqUpdateBrandType } from "@/types/admin/brand";
// -------------- get brands --------------

export const getBrands_Admin = async () => {
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

export const getBrand_Admin = async (brandId: number) => {
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

export const getRelatedProductsByBrand_Admin = async (brandId: number) => {
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

export const deleteBrand_Admin = async (brandId: number) => {
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

export const updateBrandProducts_Admin = async (
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

export const CreateBrand_Admin = async (body: ReqCreateBrandType) => {
  const { data, error } = await supabase.from("brands").insert(body).select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- update category --------------

export const UpdateBrand_Admin = async (
  brandId: number,
  updatedData: ReqUpdateBrandType,
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
