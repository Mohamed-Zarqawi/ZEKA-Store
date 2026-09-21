import { supabase } from "@/lib/supabase";
import { OrderType } from "@/types/shop/order";

export const createOrder = async (userId: string) => {
  const { data, error } = await supabase.rpc("create_order", {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `id,
      status,
      total,
      createdAt,
      order_items (
        id,
        quantity,
        orderId,
        price,
        product:products (
          *
        )
      )
    `,
    )
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (data) {
    console.log(data);
  }

  if (error) {
    throw error;
  }

  return data as unknown as OrderType[];
};
