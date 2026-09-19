"use client";

import { Heart } from "@/components/animate-ui/icons/heart";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";
import { FavoriteItem } from "@/types/shop/favoriteItem";

import { ProductType } from "@/types/shop/product";
import Link from "next/link";
import { toast } from "sonner";

const CartItem = ({ product }: { product: ProductType }) => {
  // ==========================================
  // Hooks & State Management
  // ==========================================
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: favorites = [], isLoading: isLoadingFavorites } =
    useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  // ==========================================
  // Derived State & Handlers
  // ==========================================
  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites", { richColors: true });
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  // ==========================================
  // Render Component
  // ==========================================
  return (
    <div className="md:border-primary flex h-35 flex-col items-center bg-[#1a1a1a]/20 px-3 py-4 md:h-fit md:flex-row md:justify-between md:gap-5 md:rounded-3xl md:border md:p-7">
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
            <div className="text-primary min-w-3 text-sm">
              ${product?.price}
            </div>
          </div>

          {/* Counter and Favorite Controls */}
          <div className="mb-1 flex items-center gap-2 md:mb-0 md:justify-between md:gap-3">
            {/* Quantity Counter */}
            <Counter
              product={product}
              classname="flex justify-between items-center bg-zinc-700 h-7 w-19 md:h-8 rounded-md md:w-21 "
              plusClass="flex justify-center items-center pr-2 py-0.5 md:pr-2 md:py-1 hover:cursor-pointer"
              minusClass="flex justify-center items-center pl-2 py-0.5 md:pl-2 md:py-1"
              spanClass="mx-auto select-none"
              trashSize="size-4 text-primary -mr-0.5"
            />

            {/* Favorite Toggle Button */}
            <Button
              variant="none"
              size="none"
              onClick={handleFavoriteClick}
              className="flex h-7 items-center justify-between rounded-md bg-zinc-700 px-1.5 md:h-8 md:px-2 md:py-2"
            >
              {isToggleFavorite ? (
                <AnimateIcon loop animateOnView loopDelay={100}>
                  <Heart
                    className="text-primary size-4 cursor-pointer"
                    animation="path"
                  />
                </AnimateIcon>
              ) : isInFavorite ? (
                <AnimateIcon animateOnView>
                  <Heart
                    className="text-primary size-4 cursor-pointer"
                    animation="fill"
                  />
                </AnimateIcon>
              ) : (
                <Heart className="text-primary size-4 cursor-pointer" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
