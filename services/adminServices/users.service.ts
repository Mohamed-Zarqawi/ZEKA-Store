"use server"; // هذا السطر يحمي الملف بالكامل ويحوله إلى Server Actions آمنة

import { Users } from "@/features/dashboard/pages/users/columns";
import { supabase } from "@/lib/supabaseAdmin";

// -------------------- getUsers --------------------
export const getUsersAdmin = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*, orders_number, favorites_number, addresses(*)")
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) throw error;
  return data;
};

export const getUserAdmin = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      "*, orders_number, favorites_number, addresses(*) , favorite_items(id,userId,productId,product:products (*, category:categories(*) , brand:brands(*))) , orders(id,status,total,createdAt,order_items(id,quantity,price,product:products(*)))",
    )
    .eq("id", userId)
    .single();

  console.log(data);

  if (error) throw error;
  return data;
};

// -------------------- updateUser --------------------
export const updateUserAdmin = async (
  userId: string,
  updatedData: Partial<Users>,
) => {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// -------------------- deleteUser --------------------
export const deleteUserAdmin = async (userId: string) => {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;
  return data;
};

// -------------------- block / unblock User --------------------
export const toggleUserBlockAdmin = async (userId: string) => {
  const { data, error } = await supabase.rpc("toggle_user_block", {
    target_user_id: userId,
  });

  if (error) throw error;

  return data;
};
