import { createOrder, getOrders } from "@/services/orderServices/order.service";
import { OrderType } from "@/types/shop/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return createOrder(userId);
    },
    onSuccess: (res, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cart", {});
    },
  });
};

export const useGetOrders = (userId?: string) => {
  return useQuery<OrderType[]>({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId!),
    enabled: !!userId,
  });
};
