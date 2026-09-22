"use server";

import { supabase } from "@/lib/supabaseAdmin";

// -------------- upload media --------------

export const uploadMedia_Admin = async (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("products media")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("products media").getPublicUrl(data.path);

  return {
    path: data.path,
    url: publicUrl,
  };
};

export const getProductImageUrls = async () => {
  const { data, error } = await supabase.storage.from("products media").list();

  if (error) {
    throw error;
  }

  return data.map((file) => {
    const { data } = supabase.storage
      .from("products media")
      .getPublicUrl(file.name);

    return data.publicUrl;
  });
};
