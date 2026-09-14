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
        <div className="flex h-[calc(100vh-155px)] flex-col justify-center">
          {/* 1 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary text-3xl">
              YOUR FAVORITES LOOK EMPTY !
            </div>
            <Link
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 rounded-lg px-4 py-4 text-center font-extrabold transition-colors duration-300 hover:cursor-pointer"
            >
              START SHOPPING HERE !
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-primary text-3xl">FAVORITES</div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
