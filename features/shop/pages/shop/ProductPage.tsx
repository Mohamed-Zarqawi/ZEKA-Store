"use client";

import { Heart } from "@/components/animate-ui/icons/heart";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";

import { ShareButton } from "@/components/myComponents/ShareButton";
import { FavoriteItem } from "@/types/shop/favoriteItem";
import { ProductType } from "@/types/shop/product";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../../components/ProductCard";
import ProductPageSkeleton from "../../components/ProductPageSkelton";
import {
  useGetShopProduct,
  useGetShopRelatedProductsByCategory,
} from "./hooks/useShop";

interface ViewProps {
  productId: string;
}

const ProductPage = ({ productId }: ViewProps) => {
  const [rating, setRating] = useState(3);

  const {
    data: product,
    isLoading: isProductLoading,
    refetch: reGetProduct,
  } = useGetShopProduct(Number(productId));

  const { data: currentUser } = useGetCurrentUser();
  const { data: cart = [], refetch: reGetCart } = useGetCart(currentUser?.id);
  const { mutateAsync: toggleCart, isPending } = useToggleCart();

  // ------------- get related product by category -------------
  const {
    data: relatedProducts = [],
    isLoading: isRelatedCategoryLoading,
    refetch: reGetRelatd,
  } = useGetShopRelatedProductsByCategory(product?.category?.id);

  // -----------------------------------------------------------
  const cartItem = cart.find((item) => item.productId === product?.id);
  console.log(cartItem);
  const isInCart = !!cartItem;

  const handleCartClick = async (
    e: React.MouseEvent,
    action: "add" | "decrease",
  ) => {
    e.preventDefault(); // منع فتح الرابط عند الضغط على الزر

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart", {});
      return;
    }

    if (!product) {
      toast.error("Faild to get cart", {});
      return;
    }

    await toggleCart({
      userId: currentUser.id,
      productId: product.id,
      action: action,
    });

    await Promise.all([reGetCart(), reGetProduct(), reGetRelatd()]);
  };

  // ------------- handle change images -------------

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageUrl =
    selectedImage || product?.images?.[0] || "/images/placeholder.jpeg";

  const handleChangeImage = (url: string) => {
    setSelectedImage(url);
  };

  // ------------- handle favorites -------------

  const { data: favorites = [] } = useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product?.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites", {});
      return;
    }

    if (!product) {
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  if (isProductLoading || isRelatedCategoryLoading) {
    return (
      <div>
        <ProductPageSkeleton />
      </div>
    );
  }

  if (!product) return;
  return (
    <div className="mx-4 mt-6 md:mx-10 md:my-15">
      <div className="flex h-fit w-full flex-col items-center gap-6 md:flex-row">
        {/* left */}
        <div className="relative flex w-full max-w-155 gap-8">
          <div className="no-scrollbar hidden h-130 w-31 flex-col gap-4 overflow-y-auto rounded-2xl md:flex">
            {product?.images?.length ? (
              product.images.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  width={124}
                  height={100}
                  onClick={() => handleChangeImage(image)}
                  className="border-primary h-25 w-full rounded-2xl border object-cover object-center hover:cursor-pointer"
                  alt={product.name}
                />
              ))
            ) : (
              <Image
                src="/images/placeholder.jpeg"
                width={124}
                height={100}
                className="border-primary h-25 w-full rounded-2xl border object-cover object-center"
                alt={product?.name}
              />
            )}
          </div>

          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col gap-2 md:hidden">
              <div className="text-sm">
                <span className="text-primary uppercase">
                  {product?.category?.name || "Uncategorized"} |{" "}
                </span>
                <span className="text-primary uppercase">
                  {product?.brand?.name}
                </span>
              </div>

              <div className="mt-0.75 text-xl md:text-5xl">{product?.name}</div>

              {/* Rates */}
              <div className="flex w-full justify-between">
                <div className="bg-chart-5 flex w-fit items-center gap-1 rounded-sm px-3 py-1">
                  <IconStarFilled className="text-primary size-4 cursor-pointer" />
                  <div className="text-sm">4.5</div>
                </div>

                <div className="flex gap-2">
                  {/* add to favorites button */}
                  <Button
                    size={"none"}
                    onClick={handleFavoriteClick}
                    className="bg-chart-5 w-fit cursor-pointer border p-2 text-lg"
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
                  <ShareButton
                    iconClassName="text-primary size-5 cursor-pointer"
                    className="bg-chart-5 w-fit cursor-pointer border p-2 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:max-w-130">
              {!isProductLoading ? (
                <Image
                  src={imageUrl}
                  width={520}
                  height={520}
                  className="border-primary w-full rounded-2xl border object-cover object-center hover:cursor-pointer md:h-130 md:max-w-130"
                  alt={product?.name}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="hidden h-130 w-full flex-col justify-between gap-4 md:flex">
          <div className="w-full">
            <span className="text-primary uppercase">
              {product?.category?.name || "Uncategorized"} |{" "}
            </span>
            <span className="text-primary uppercase">
              {product?.brand?.name || "No Brand"}
            </span>

            <div className="mt-6 text-5xl">{product?.name}</div>

            {/* Rates */}
            <div className="mt-5 flex items-center gap-2">
              {rating !== 0 && <div className="text-sm">{rating}</div>}
              {[1, 2, 3, 4, 5].map((star: number) => (
                <button key={star} onClick={() => setRating(star)}>
                  {star <= rating ? (
                    <IconStarFilled className="text-primary size-5 cursor-pointer" />
                  ) : (
                    <IconStar className="text-primary size-5 cursor-pointer" />
                  )}
                </button>
              ))}
              <div className="border-l-2 border-zinc-400 pl-2 text-sm text-zinc-400">
                1501 Ratings
              </div>
            </div>

            {/* price */}
            <div className="text-primary mt-6 text-3xl">
              ${product?.price.toFixed(2)}
            </div>

            {/* description */}
            <div className="mt-6 flex flex-col gap-2">
              Description:
              <div className="text-sm text-zinc-400">
                {product?.description}
              </div>
            </div>

            {product.stock < 5 && product.stock > 0 ? (
              <div className="text-primary mt-6 flex items-center gap-2">
                {product?.stock}
                <div className="text-sm">Left in stock</div>
              </div>
            ) : null}

            {product.stock == cartItem?.quantity ? (
              <div className="text-primary mt-6 flex items-center gap-2">
                <div className="text-destructive text-sm">
                  Maximum items added in cart
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex w-full items-center">
              {/* Counter or Add to Cart */}

              {isInCart && cartItem ? (
                <Counter
                  product={cartItem.product}
                  classname="flex justify-between items-center bg-primary h-20 rounded-2xl w-full text-lg text-center hover:cursor-pointer"
                  plusClass={`flex justify-center items-center px-10 py-6 h-full rounded-r-2xl rounded-l-[0] text-lg hover:cursor-pointer`}
                  minusClass="flex justify-center items-center px-10 py-6 h-full rounded-l-2xl rounded-r-[0] text-lg hover:cursor-pointer"
                  spanClass="mx-auto text-lg select-none py-6"
                  trashSize="size-5"
                />
              ) : (
                <Button
                  size={"none"}
                  disabled={product.stock == 0 || isPending}
                  isPending={isPending}
                  onClick={(e) => {
                    handleCartClick(e, "add");
                  }}
                  className="bg-primary hover:bg-secondary h-20 w-full rounded-2xl px-4 py-6 text-center text-lg"
                >
                  {product.stock == 0 ? "OUT OF STOCK" : "ADD TO CART"}
                </Button>
              )}
            </div>
            {/* add to favorites button */}
            <Button
              variant={"outline"}
              onClick={handleFavoriteClick}
              className="border-primary h-20 cursor-pointer rounded-2xl border px-6 py-6 text-lg"
            >
              {isToggleFavorite ? (
                <AnimateIcon loop animateOnView loopDelay={100}>
                  <Heart
                    className="text-primary size-7 cursor-pointer"
                    animation="path"
                  />
                </AnimateIcon>
              ) : isInFavorite ? (
                <AnimateIcon animateOnView>
                  <Heart
                    className="text-primary size-7 cursor-pointer"
                    animation="fill"
                  />
                </AnimateIcon>
              ) : (
                <Heart className="text-primary size-7 cursor-pointer" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* suggested products */}
      <div>
        <div className="mt-15 flex flex-col gap-8">
          <div className="text-primary text-3xl uppercase">
            MORE FROM {product?.category.name}
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 sm:gap-6">
            {relatedProducts?.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
