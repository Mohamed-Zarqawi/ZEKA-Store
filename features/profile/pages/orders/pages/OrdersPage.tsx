"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import Link from "next/link";
import OrderCard from "../components/OrderCard";
import { useGetOrders } from "./hooks/useOrder";
import OrderCardSkeleton from "../components/OrderCardSkelton";

const OrdersPage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrders(
    currentUser?.id,
  );

  if (orders?.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-155px)] flex-col justify-center lg:min-h-[calc(100dvh-185px)]">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <div className="text-primary text-center text-2xl md:text-3xl">
            YOU HAVEN&apos;T PLACED ANY ORDERS YET !
          </div>

          <div className="text-center text-base md:text-xl">
            WHAT ARE YOU WAITING FOR?
          </div>

          <Link
            href="/shop"
            className="bg-primary hover:bg-secondary mt-4 rounded-lg px-3 py-3 text-center text-sm transition-colors duration-300 hover:cursor-pointer md:px-4 md:py-4 md:text-base"
          >
            START SHOPPING NOW!
          </Link>
        </div>
      </div>
    );
  }

  if (isOrdersLoading || isCurrentUserLoading) {
    return <OrderCardSkeleton />;
  }
  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">ORDERS</div>
      <div className="text-muted-foreground mt-2 text-xs">
        View & Update Your Personal and Contact Information
      </div>
      <div className="-mt-4 md:mt-10">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
