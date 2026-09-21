"use client";

import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import CartItem from "@/features/cart/components/CartItemCard";
import { useCreateOrder } from "@/features/profile/pages/orders/pages/hooks/useOrder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartPageSkeleton from "../components/CartPageSkeleton";
import { useGetCart } from "./hooks/useCart";

const CartPage = () => {
  const router = useRouter();

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { mutate: createOrderMutation, isPending: isCreateOrder } =
    useCreateOrder();

  const handleCreateOrder = () => {
    if (!currentUser?.id) return;

    createOrderMutation(currentUser.id);
    router.push("/profile/orders");
  };

  const { data: cart = [], isLoading: isLoadingCart } = useGetCart(
    currentUser?.id,
  );

  console.log(currentUser?.id);

  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  const shippingFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + shippingFee;

  if (isLoadingCart || isCurrentUserLoading) {
    return <CartPageSkeleton />;
  }
  return (
    <div className="mx-4 md:mx-10">
      {cart.length > 0 ? (
        <div className="mt-8 flex flex-col gap-5 md:mt-15 md:gap-10">
          {/* 1 */}
          <div className="text-primary text-xl md:text-3xl">
            YOUR SHOPPING BAG
          </div>

          {/* 2 */}

          <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            {/* left */}
            <div className="border-primary divide-primary/40 flex w-full flex-col divide-y overflow-hidden rounded-3xl border md:gap-6 md:border-0">
              {cart.map((item) => (
                <CartItem key={item.id} product={item.product} />
              ))}
            </div>

            {/* right */}

            <div className="border-primary flex h-fit w-full flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-5 backdrop-blur-md md:sticky md:top-24 md:w-200 md:gap-8 md:p-7">
              <div className="text-primary text-lg md:text-2xl">
                ORDER SUMMARY
              </div>

              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex justify-between">
                  <div className="text-sm md:text-base">SubTotal</div>
                  <div className="text-primary text-sm md:text-base">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm md:text-base">Shipping Fee</div>
                  <div className="text-primary text-sm md:text-base">
                    ${shippingFee.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="bg-primary h-px"></div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="text-base md:text-xl">TOTAL</div>
                  <div className="text-primary text-base md:text-xl">
                    ${total.toFixed(2)}
                  </div>
                </div>

                <Button
                  variant={"none"}
                  size={"none"}
                  onClick={handleCreateOrder}
                  disabled={isCreateOrder}
                  isPending={isCreateOrder}
                  pendingText="PROCESSING..."
                  className="bg-primary hover:bg-secondary hidden items-center rounded-lg px-2 py-3 text-center text-sm transition-colors duration-300 disabled:opacity-70 md:flex md:px-3 md:py-4 md:text-base"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant={"none"}
            size={"none"}
            onClick={handleCreateOrder}
            disabled={isCreateOrder}
            isPending={isCreateOrder}
            pendingText="PROCESSING..."
            className="bg-primary/60 border-primary sticky bottom-21 -mt-2 flex items-center rounded-xl px-3 py-4 text-center text-sm backdrop-blur-md disabled:opacity-70 md:hidden"
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      ) : (
        <div className="flex min-h-[calc(100dvh-155px)] flex-col justify-center lg:min-h-[calc(100dvh-185px)]">
          {/* 1 */}
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="text-primary text-center text-2xl md:text-3xl">
              YOUR SHOPPING CART LOOK EMPTY !
            </div>
            <div className="text-center text-base md:text-xl">
              WHAT ARE YOU WAITING FOR?
            </div>
            <Link
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 rounded-lg px-3 py-3 text-center text-sm transition-colors duration-300 hover:cursor-pointer md:px-4 md:py-4 md:text-base"
            >
              START SHOPPING NOW !
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
