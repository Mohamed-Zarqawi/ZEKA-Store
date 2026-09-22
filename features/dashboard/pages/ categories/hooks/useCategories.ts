import {
  CreateAdminCategory as CreateCategoryAdmin,
  deleteCategoryAdmin,
  getAdminCategories,
  getAdminCategory,
  getAdminRelatedProductsByCategory,
  UpdateAdminCategory,
  updateCategoryProducts,
} from "@/services/adminServices/categories.service";
import { ReqCreateCategoryType, ResCategoryType } from "@/types/admin/category";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

// -------------- get categories --------------

export const useGetAdminCategories = () => {
  return useQuery({
    queryKey: ["categories", "admin"],
    queryFn: () => getAdminCategories(),
  });
};

// -------------- get category --------------

export const useGetAdminCategory = (categoryId: number) => {
  return useQuery<ResCategoryType>({
    queryKey: ["category", "admin", categoryId],
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
      queryClient.invalidateQueries({ queryKey: ["categories", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
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

// -------------- Create category --------------

export const useCreateCategoryAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (body: ReqCreateCategoryType) => {
      return CreateCategoryAdmin(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully!");
    },
    onError: () => {
      toast.error("Create category faild", {});
    },
  });
};

// -------------- Update category --------------

export const useUpdateAdminCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      categoryId,
      updatedData,
    }: {
      categoryId: number;
      updatedData: ResCategoryType;
    }) => {
      return UpdateAdminCategory(categoryId, updatedData);
    },

    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/categories");
    },
    onError: () => {
      toast.error("Failed to update category!");

      toast.error("Update Category Faild");
    },
  });
};
