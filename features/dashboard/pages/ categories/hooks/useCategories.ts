import {
  deleteCategoryAdmin,
  getAdminBrands,
  getAdminCategories,
  getAdminCategory,
  getAdminRelatedProductsByBrand,
  getAdminRelatedProductsByCategory,
  updateCategoryProducts,
} from "@/services/adminServices/categories.service";
import { ResCategoryType } from "@/types/admin/category";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// -------------- get categories --------------

export const useGetAdminCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAdminCategories(),
  });
};

// -------------- get category --------------

export const useGetAdminCategory = (categoryId: number) => {
  return useQuery<ResCategoryType>({
    queryKey: ["category", categoryId],
    queryFn: () => getAdminCategory(categoryId),
  });
};

// -------------- update products category --------------

interface UpdateCategoryProductsParams {
  categoryId: number;
  productIds: number[];
}

export const useUpdateAdminCategoryProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, productIds }: UpdateCategoryProductsParams) =>
      updateCategoryProducts(categoryId, productIds),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// -------------- get related products by category --------------

export const useGetAdminRelatedProductsByCategory = (categoryId?: number) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getAdminRelatedProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
};

// -------------- delete category --------------

export const useDeleteCategoryAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) => deleteCategoryAdmin(categoryId),

    onSuccess: (_, categoryId) => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      queryClient.removeQueries({
        queryKey: ["categories", categoryId],
      });
    },
    onError: (error) => {
      toast.error("Something went wrong while deleting category.");
      console.error(error);
    },
  });
};

// -------------- get brands --------------

export const useGetAdminBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getAdminBrands(),
  });
};

// -------------- get related products by brand --------------

export const useGetAdminRelatedProductsByBrand = (brandId: number) => {
  return useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getAdminRelatedProductsByBrand(brandId),
    enabled: !!brandId,
  });
};
