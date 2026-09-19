import { getCart, toggleCart } from "@/services/cartServices/cart.service";
import { CartItemType } from "@/types/shop/cartItemType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCart = (userId?: string) => {
  return useQuery<CartItemType[]>({
    queryKey: ["cart", userId],
    enabled: !!userId,
    queryFn: () => getCart(userId!),
  });
};

interface CartMutationParams {
  userId: string;
  productId: number;
  action?: "add" | "decrease";
}

export const useToggleCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      productId,
      action = "add",
    }: CartMutationParams) => {
      return toggleCart(userId, productId, action);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart", variables.userId] });

      if (res?.action === "added") {
        toast.success("Added to cart successfully!", { richColors: true });
      } else if (res?.action === "updated") {
        toast.success("Cart quantity updated", { richColors: true });
      } else if (res?.action === "deleted") {
        toast.success("Item removed from cart", { richColors: true });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cart", {});
    },
  });
};
