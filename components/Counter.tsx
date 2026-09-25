import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import { useGetShopProduct } from "@/features/shop/pages/shop/hooks/useShop";
import { ProductType } from "@/types/shop/product";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type CounterProps = {
  product: ProductType;
  classname?: string;
  plusClass?: string;
  minusClass?: string;
  spanClass?: string;
  trashSize?: string;
  isLoading?: boolean;
};
const Counter = ({
  product,
  classname,
  plusClass,
  minusClass,
  spanClass,
  trashSize,
  isLoading,
}: CounterProps) => {
  const {
    data,
    isLoading: isProductLoading,
    refetch: reGetProduct,
  } = useGetShopProduct(Number(product?.id));
  const { data: currentUser, refetch: reGetCurrentUser } = useGetCurrentUser();
  const { data: cart = [], refetch: reGetCart } = useGetCart(currentUser?.id);
  const { mutateAsync: toggleCart, isPending: isToggleCart } = useToggleCart();

  const cartItem = cart.find((item) => item?.productId === product?.id);

  const handleCartClick = async (
    e: React.MouseEvent,
    action: "add" | "decrease",
  ) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart", {});
      return;
    }

    await toggleCart({
      userId: currentUser.id,
      productId: product?.id,
      action: action,
    });

    await Promise.all([reGetCart(), reGetProduct()]);
  };

  const disabled = () => {
    if (cartItem?.quantity == product.stock) {
      return true;
    } else return false;
  };

  if (!cartItem) {
    return;
  }
  return (
    <div
      className={classname}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Button
        size={"none"}
        variant={"none"}
        disabled={isToggleCart}
        onClick={(e) => {
          handleCartClick(e, "decrease");
        }}
        className={minusClass}
      >
        {cartItem.quantity > 1 ? "-" : <IconTrash className={trashSize} />}
      </Button>
      <div className={` ${spanClass}`}>
        {isToggleCart ? (
          <span className="flex items-center justify-center">
            <Spinner data-icon="inline-start" />
          </span>
        ) : (
          `${cartItem?.quantity}`
        )}
      </div>
      <Button
        variant={"none"}
        size={"none"}
        disabled={isToggleCart || disabled()}
        onClick={(e) => {
          handleCartClick(e, "add");
        }}
        className={plusClass}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
