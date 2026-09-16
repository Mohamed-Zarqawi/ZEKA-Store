import {
  getProductsPrices,
  getShopBrands,
  getShopCategories,
  getShopProduct,
  getShopProducts,
  getShopRelatedProductsByBrand,
  getShopRelatedProductsByCategory,
} from "@/services/shopServices/shop.service";
import { ProductType } from "@/types/shop/product";
import { useQuery } from "@tanstack/react-query";

// -------------- getProducts --------------

export const useGetShopProducts = (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
  search: string = "",
) => {
  return useQuery({
    queryKey: [
      "products",
      page,
      categories.join(","),
      brands.join(","),
      minPrice,
      maxPrice,
      search,
    ],
    queryFn: () =>
      getShopProducts(page, categories, brands, minPrice, maxPrice, search),
  });
};

// -------------- get one product --------------

export const useGetShopProduct = (productId: number) => {
  return useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: () => getShopProduct(productId),
  });
};
// -------------- get categories --------------

export const useGetShopCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getShopCategories(),
  });
};

// -------------- get brands --------------

export const useGetShopBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getShopBrands(),
  });
};

// -------------- getProducts --------------

export const useGetProductPrices = () => {
  return useQuery({
    queryKey: ["products prices"],
    queryFn: () => getProductsPrices(),
  });
};

// -------------- get related products by category --------------

export const useGetShopRelatedProductsByCategory = (categoryId?: number) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getShopRelatedProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
};
// -------------- get related products by brand --------------

export const useGetShopRelatedProductsByBrand = (brandId: number) => {
  return useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getShopRelatedProductsByBrand(brandId),
    enabled: !!brandId,
  });
};
