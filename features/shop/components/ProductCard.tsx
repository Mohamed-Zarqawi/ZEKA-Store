"use client";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import Counter from "@/components/Counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";

import { FavoriteItem } from "@/types/shop/favoriteItem";
import { ProductType } from "@/types/shop/product";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart } from "../../../components/animate-ui/icons/heart";
import { ProductCardSkeleton } from "./ProductCardSkilton";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: cart = [], isLoading: isCartLoading } = useGetCart(
    currentUser?.id,
  );
  const { mutate: toggleCart, isPending: isToggleCart } = useToggleCart();

  const { data: favorites = [], isLoading: isLoadingFavorites } =
    useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  // ------------------------------------
  const cartItem = cart.find((item) => item.productId === product.id);
  const isInCart = !!cartItem;

  const handleCartClick = (e: React.MouseEvent, action: "add" | "decrease") => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart", {});
      return;
    }

    toggleCart({
      userId: currentUser.id,
      productId: product.id,
      action: action,
    });
  };

  // -----------------------------------
  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites", {});
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  if (isCartLoading || isLoadingFavorites || isCurrentUserLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <div>
      <Link href={`/shop/${product.id}`}>
        <div className="group bg-card border-border flex h-79 w-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 md:h-99">
          {/* image & cart icon */}

          <div className="relative">
            {/* love icon */}
            <div className="flex flex-col">
              <Button
                variant="none"
                size="none"
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 cursor-pointer rounded-lg md:top-5 md:right-4"
              >
                {isToggleFavorite ? (
                  <AnimateIcon loop animateOnView loopDelay={100}>
                    <Heart
                      className="text-primary size-5 cursor-pointer"
                      animation="path"
                    />
                  </AnimateIcon>
                ) : isInFavorite ? (
                  <AnimateIcon animateOnView>
                    <Heart
                      className="text-primary size-5 cursor-pointer"
                      animation="fill"
                    />
                  </AnimateIcon>
                ) : (
                  <Heart className="text-primary size-5 cursor-pointer" />
                )}
              </Button>

              {/* Out of stock */}

              <div className="absolute top-3 left-3 flex flex-col gap-2 md:top-5 md:left-4">
                {product.stock < 5 && product.stock > 0 ? (
                  <Badge
                    variant={"default"}
                    className="bg-primary/80 cursor-pointer rounded-lg border p-1.5 text-[9px] transition-transform duration-300 md:text-[10px]"
                  >
                    {product?.stock} Left in stock
                  </Badge>
                ) : null}

                {product.stock == 0 ? (
                  <Badge
                    variant={"default"}
                    className="bg-primary/80 cursor-pointer rounded-lg border p-1.5 text-[9px] transition-transform duration-300 md:text-[10px]"
                  >
                    Out of stock
                  </Badge>
                ) : null}

                {product.stock == cartItem?.quantity ? (
                  <Badge
                    variant={"destructive"}
                    className="bg-primary/80 cursor-pointer rounded-lg border p-1.5 text-[9px] transition-transform duration-300 md:text-[10px]"
                  >
                    Maximum items added in cart
                  </Badge>
                ) : null}
              </div>

              {/* add to cart */}

              <div className="absolute right-3 bottom-3 md:right-4 md:bottom-5">
                {isInCart && cartItem ? (
                  <>
                    <Counter
                      product={cartItem.product}
                      classname="flex items-center border border-primary bg-primary/80 h-7 min-w-19 rounded-md max-w-20"
                      plusClass="flex justify-center items-center pr-2 py-0.5 hover:cursor-pointer"
                      minusClass="flex justify-center items-center pl-2 py-0.5 hover:cursor-pointer"
                      spanClass="mx-auto select-none"
                      trashSize="size-4  flex justify-center items-center hover:cursor-pointer "
                    />
                  </>
                ) : (
                  <Button
                    size={"none"}
                    variant={"none"}
                    disabled={product.stock == 0}
                    isPending={isToggleCart}
                    onClick={(e) => {
                      handleCartClick(e, "add");
                    }}
                    className="bg-primary/80 border-primary rounded-lg border p-1.5 group-hover:cursor-pointer"
                  >
                    <IconShoppingCartPlus className="size-4" />
                  </Button>
                )}
              </div>
            </div>
            {/* image */}
            <img
              src={product.images?.[0] || "/images/placeholder.jpeg"}
              alt={product.name || "Product Image"}
              className="h-46 w-full object-cover object-center hover:cursor-pointer md:h-64"
            />
          </div>
          {/* content */}
          <div className="bg-card flex h-full flex-col justify-between p-3 md:p-4">
            <div className="flex flex-col gap-1">
              <div className="text-[10px] text-zinc-400 md:text-xs">
                {product.brand?.name ? product.brand.name : "No Brand"}
              </div>
              <div className="line-clamp-2 text-[11px] md:text-sm">
                {product.name}
              </div>
            </div>

            <div className="mt-2 flex w-full items-center justify-between md:mt-3">
              <div className="flex w-full flex-col-reverse items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
                <Badge
                  variant={"outline"}
                  className="bg-primary/20! text-[8px] md:text-[0.625rem]"
                >
                  {product.category?.name
                    ? product.category.name
                    : "No Category"}
                </Badge>

                <div className="text-primary text-xs md:text-sm">
                  ${product.price ? product.price.toFixed(2) : "0.00"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
