"use server";

import { Users } from "@/features/dashboard/pages/users/columns";
import { supabase } from "@/lib/supabaseAdmin";

// -------------------- get users --------------------
export const getUsers_Admin = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*, orders_number, favorites_number, addresses(*)")
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) throw error;
  return data;
};

export const getUser_Admin = async (userId: string) => {
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

// -------------------- update user --------------------

export const updateUser_Admin = async (
  userId: string,
  updatedData: Partial<Users>,
) => {
  const { data: updateData, error: updateDataError } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", userId)
    .select()
    .single();

  if (updateDataError) throw updateDataError;

  let authUser = null;
  if (updatedData.email) {
    const { data: authData, error: updateEmailError } =
      await supabase.auth.admin.updateUserById(userId, {
        email: updatedData.email,
        email_confirm: true,
      });

    if (updateEmailError) throw updateEmailError;
    authUser = authData.user;
  }

  return {
    ...updateData,
    auth: authUser,
  };
};

// -------------------- delete user --------------------
export const deleteUser_Admin = async (userId: string) => {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;
  return data;
};

// -------------------- block / unblock User --------------------
export const toggleUserBlock_Admin = async (userId: string) => {
  const { data, error } = await supabase.rpc("toggle_user_block", {
    target_user_id: userId,
  });

  if (error) throw error;

  return data;
};

// -------------------- delete address user --------------------

export const deleteAddress_Admin = async (addressId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .select();

  if (error) throw error;
  return data;
};
