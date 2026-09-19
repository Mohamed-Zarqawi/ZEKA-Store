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

// Define the expected props interface containing the product ID
interface ViewProps {
  productId: string;
}

const ProductPage = ({ productId }: ViewProps) => {
  // Local state to manage the product's star rating
  const [rating, setRating] = useState(3);

  // Fetch basic product details using the parsed numeric ID
  const {
    data: product,
    isLoading: isProductLoading,
    refetch: reGetProduct,
  } = useGetShopProduct(Number(productId));

  // Fetch current user info, cart data, and cart toggle mutation hook
  const { data: currentUser } = useGetCurrentUser();
  const { data: cart = [], refetch: reGetCart } = useGetCart(currentUser?.id);
  const { mutateAsync: toggleCart, isPending } = useToggleCart();

  // ------------- Fetch related products based on the product's category -------------
  const {
    data: relatedProducts = [],
    isLoading: isRelatedCategoryLoading,
    refetch: reGetRelatd,
  } = useGetShopRelatedProductsByCategory(product?.category?.id);

  // -----------------------------------------------------------
  // Check whether the current product already exists in the cart
  const cartItem = cart.find((item) => item.productId === product?.id);
  console.log(cartItem);
  const isInCart = !!cartItem;

  // Handler for adding or decreasing product quantities in the cart
  const handleCartClick = async (
    e: React.MouseEvent,
    action: "add" | "decrease",
  ) => {
    e.preventDefault(); // Prevent wrapper links from triggering

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

  // ------------- Handle image switching functionality -------------

  const image = product?.images?.[0];
  const [selectedImage, setSelectedImage] = useState<string | null>(
    image || null,
  );
  const imageUrl =
    selectedImage || product?.images?.[0] || "/images/placeholder.jpeg";

  const handleChangeImage = (url: string) => {
    setSelectedImage(url);
  };

  // ------------- Handle user wishlist/favorites functionality -------------

  const { data: favorites = [] } = useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  // Check if the current product is saved in favorites
  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product?.id,
  );
  const isInFavorite = !!favoriteItem;

  // Handler for toggling a product's favorite status
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

  // Render a skeleton loader while product or related data is being fetched
  if (isProductLoading || isRelatedCategoryLoading) {
    return (
      <div>
        <ProductPageSkeleton />
      </div>
    );
  }

  // Return nothing early if product data is missing
  if (!product) return;
  return (
    <div className="mt-6 md:my-15 md:mx-10 mx-0">
      <div className="flex h-fit w-full flex-col items-center gap-3 md:flex-row md:gap-6">
        {/* Left column: Thumbnails and main product imagery */}
        <div className="relative flex w-full max-w-155 gap-6 md:gap-8">
          {/* Vertical thumbnail image list for desktop view */}
          <div className="no-scrollbar hidden h-130 w-31 flex-col gap-4 overflow-y-auto rounded-2xl md:flex">
            {product?.images?.length ? (
              product.images.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  width={500}
                  height={500}
                  onClick={() => handleChangeImage(image)}
                  className="border-primary h-25 w-full rounded-2xl border object-cover object-center hover:cursor-pointer"
                  alt={product.name}
                />
              ))
            ) : (
              <Image
                src="/images/placeholder.jpeg"
                width={500}
                height={500}
                className="border-primary h-25 w-full rounded-2xl border object-cover object-center"
                alt={product?.name}
              />
            )}
          </div>

          <div className="flex w-full flex-col gap-3">
            {/* Top meta info and quick actions for mobile screens */}
            <div className="flex w-full flex-col gap-1 md:hidden md:px-0 px-4">
              <div className="text-xs">
                <span className="text-primary uppercase">
                  {product?.category?.name || "Uncategorized"} |{" "}
                  {product?.brand?.name}
                </span>
              </div>

              <div className="text-xl ">{product?.name}</div>

              <div className="mt-1 flex w-full justify-between">
                {/* Rating score badge */}
                <div className="bg-chart-5 flex w-fit items-center gap-1 rounded-sm px-3">
                  <IconStarFilled className="text-primary size-4 cursor-pointer" />
                  <div className="text-sm">4.5</div>
                </div>

                <div className="flex gap-2">
                  {/* Mobile favorite action button */}
                  <Button
                    size={"none"}
                    variant={"none"}
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
                  {/* Share action button */}
                  <ShareButton
                    iconClassName="text-primary size-5 cursor-pointer"
                    className="bg-chart-5 w-fit cursor-pointer border p-2 text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Main large display image container */}
            <div className="w-full md:max-w-130 md:px-0 px-4">
              {!isProductLoading ? (
                <Image
                  src={imageUrl}
                  width={2000}
                  height={2000}
                  className="border-primary aspect-square w-full rounded-2xl border object-cover object-center hover:cursor-pointer md:h-130 md:max-w-130"
                  alt={product?.name}
                />
              ) : null}
            </div>

            {/* Horizontal thumbnail image scroller for mobile view */}
            <div
              className={`no-scrollbar border-primary md:bg-background flex w-full flex-row gap-3 md:px-0 px-4 overflow-x-scroll sm:border sm:bg-[#1a1a1a]/20 sm:p-3 md:hidden md:overflow-x-auto`}
            >
              {product?.images?.length ? (
                product.images.map((image, i) => (
                  <Image
                    key={i}
                    src={image}
                    width={500}
                    height={100}
                    onClick={() => handleChangeImage(image)}
                    className={`transition-color aspect-square h-25 w-25 rounded-xl border object-cover object-center duration-500 hover:cursor-pointer ${image == (selectedImage || imageUrl) ? "border-primary" : "border-primary/30"} `}
                    alt={product.name}
                  />
                ))
              ) : (
                <Image
                  src="/images/placeholder.jpeg"
                  width={124}
                  height={100}
                  className="border-primary aspect-square h-25 w-25 rounded-2xl border object-cover object-center"
                  alt={product?.name}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right column: Product title, pricing, specifications, and cart controls */}
        <div className="flex h-fit w-full flex-col justify-between gap-4 md:h-130 md:px-0 px-4">
          <div className="w-full">
            <span className="text-primary hidden uppercase md:block">
              {product?.category?.name || "Uncategorized"} |{" "}
              {product?.brand?.name || "No Brand"}
            </span>

            <div className="mt-6 hidden text-5xl md:block">{product?.name}</div>

            {/* Interactive review stars component for desktop view */}
            <div className="mt-5 hidden items-center gap-2 md:flex">
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

            {/* Formatted product price display */}
            <div className="text-primary text-2xl md:mt-6 md:text-3xl">
              ${product?.price.toFixed(2)}
            </div>

            <div>
              <div className="flex flex-col-reverse md:flex-col">
                {/* Product description block */}
                <div className="mt-2 flex flex-col gap-1 md:mt-6 md:gap-2">
                  Description:
                  <span className="text-muted-foreground text-xs">
                    {product?.description}
                  </span>
                </div>

                {/* Stock inventory availability indicators */}
                {product.stock < 5 && product.stock > 0 ? (
                  <div className="text-primary mt-1 flex items-center gap-2 text-sm md:mt-6">
                    <span>{product?.stock}</span>Left in stock
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
            </div>
          </div>

          {/* Action buttons: Quantity counter / Add to cart, and desktop favorite button */}
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex w-full items-center">
              {/* Conditional render: Quantity counter if in cart, or add-to-cart button */}

              {isInCart && cartItem ? (
                <Counter
                  product={cartItem.product}
                  classname="flex justify-between items-center bg-primary md:h-20 h-13 rounded-lg md:rounded-2xl w-full text-lg text-center hover:cursor-pointer"
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

                  className="bg-primary hover:bg-secondary h-13 w-full rounded-lg px-4 py-6 text-center text-lg md:h-20 md:rounded-2xl"
                >
                  {product.stock == 0 ? "OUT OF STOCK" : "ADD TO CART"}
                </Button>
              )}
            </div>
            {/* Desktop favorite toggle button */}
            <Button
              variant={"outline"}
              onClick={handleFavoriteClick}
              className="border-primary hidden h-20 cursor-pointer rounded-2xl border px-6 py-6 text-lg md:block"
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

      {/* Recommended or related category products section */}
        <div className="mt-6 flex flex-col gap-6 md:mt-15 md:gap-8 md:px-0 px-4">
          <div className="text-primary text-lg uppercase md:text-3xl">
            MORE FROM {product?.category.name}
          </div>
          <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-6">
            {relatedProducts?.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default ProductPage;
