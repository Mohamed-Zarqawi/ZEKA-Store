import { Button } from "@/components/ui/button";
import { OrderType } from "@/types/shop/order";
import { ProductType } from "@/types/shop/product";
import Link from "next/link";

const OrderProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex h-35 flex-col items-center py-5 md:h-fit md:flex-row md:justify-between md:gap-5">
      {/* Product Image & Details Container */}
      <div className="flex h-full w-full items-start gap-3 md:h-fit md:items-center md:gap-5">
        {/* Product Image Link */}
        <Link
          href={`/shop/${product.id}`}
          className="block h-full w-23 shrink-0 md:h-25 md:w-25"
        >
          <img
            src={product?.images[0]}
            alt={product.name}
            className="border-primary/20 aspect-square h-full w-25 rounded-2xl border object-cover object-center hover:cursor-pointer md:h-25 md:w-25"
          />
        </Link>

        {/* Product Info & Actions */}
        <div className="flex h-full w-full flex-col justify-between md:my-0 md:flex-row md:items-center">
          {/* Title and Price */}
          <div className="mt-1 flex flex-col gap-1 md:mt-0">
            <div className="text-xs md:text-base">{product.name}</div>
            <div className="text-primary min-w-3 text-sm font-bold">
              ${product?.price.toFixed(2)}
            </div>
          </div>

          {/* Counter and Favorite Controls */}
          <div className="flex items-center gap-2 md:justify-between md:gap-3">
            <Link href={`/shop/${product?.id}`} className="block">
              <Button variant="outline" className="hidden md:block" size="lg">
                Buy Again
              </Button>

              <Button className="block md:hidden" size="sm">
                Buy Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

type OrderCardProps = {
  order: OrderType;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="border-primary mt-10 flex w-full flex-col gap-4 rounded-3xl border bg-[#1a1a1a]/20 p-5 md:p-7">
      <div className="-mb-4 text-sm text-zinc-400">Delivered at {date}</div>
      <div className="border-primary my-4 -mb-3 w-full border-b"></div>
      <div className="divide-primary/40 flex w-full flex-col divide-y">
        {order.order_items.map((item, j) => (
          <OrderProduct key={j} product={item.product} />
        ))}
      </div>
      <div className="-mt-4 flex flex-col gap-3">
        <div className="bg-primary h-px w-full"></div>
        <div className="text-sm text-zinc-400">Order Id : {order.id}</div>
      </div>
    </div>
  );
};

export default OrderCard;
