"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import ProductCard from "@/features/shop/components/ProductCard";
import Link from "next/link";
import { useGetFavorites } from "./hooks/useFavorites";

const FavoritesPage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const { data: favoritesData = [] } = useGetFavorites(currentUser?.id);

  return (
    <div>
      {favoritesData.length === 0 ? (
        <div className="flex min-h-[calc(100dvh-155px)] flex-col justify-center lg:min-h-[calc(100dvh-185px)]">
          {/* 1 */}
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="text-primary text-center text-2xl md:text-3xl">
              YOUR FAVORITES LOOK EMPTY !
            </div>
            <Link
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 rounded-lg px-3 py-3 text-center text-sm transition-colors duration-300 hover:cursor-pointer md:px-4 md:py-4 md:text-base"
            >
              START SHOPPING HERE !
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-primary text-2xl md:mb-10 md:text-3xl">
            FAVORITES
          </div>

          <div className="text-muted-foreground mt-2 mb-6 text-xs md:hidden">
            {favoritesData.length} items
          </div>

          <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
            {favoritesData.map((favorite, i) => (
              <ProductCard key={favorite.id} product={favorite.product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
