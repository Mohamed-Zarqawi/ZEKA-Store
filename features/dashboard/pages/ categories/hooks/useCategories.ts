import {
  CreateCategory_Admin as CreateCategoryAdmin,
  deleteCategory_Admin,
  getCategories_Admin,
  getCategory_Admin,
  getRelatedProductsByCategory_Admin,
  UpdateCategory_Admin,
  updateCategoryProducts_Admin,
} from "@/services/adminServices/categories.service";
import { ReqCreateCategoryType, ResCategoryType } from "@/types/admin/category";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

// -------------- get categories --------------

export const useGetCategories_Admin = () => {
  return useQuery({
    queryKey: ["categories", "admin"],
    queryFn: () => getCategories_Admin(),
  });
};

// -------------- get category --------------

export const useGetCategory_Admin = (categoryId: number) => {
  return useQuery<ResCategoryType>({
    queryKey: ["category", "admin", categoryId],
    queryFn: () => getCategory_Admin(categoryId),
  });
};

// -------------- get related products by category --------------

export const useGetRelatedProductsByCategory_Admin = (categoryId?: number) => {
  return useQuery({
    queryKey: ["relatedProductsByCategory", categoryId],
    queryFn: () => getRelatedProductsByCategory_Admin(categoryId!),
    enabled: !!categoryId,
  });
};

// -------------- Create category --------------

export const useCreateCategory_Admin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReqCreateCategoryType) => {
      return CreateCategoryAdmin(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", "admin"] });
      toast.success("Category created successfully!");
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });
};

// -------------- Update category --------------

export const useUpdateCategory_Admin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryId,
      updatedData,
    }: {
      categoryId: number;
      updatedData: ResCategoryType;
    }) => {
      return UpdateCategory_Admin(categoryId, updatedData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", "admin"] });
      toast.success("Category updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update category!");
    },
  });
};

// -------------- update category products --------------

interface UpdateCategoryProductsParams_Admin {
  categoryId: number;
  productIds: number[];
}

export const useUpdateCategoryProducts_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      productIds,
    }: UpdateCategoryProductsParams_Admin) =>
      updateCategoryProducts_Admin(categoryId, productIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
      queryClient.invalidateQueries({
        queryKey: ["relatedProductsByCategory", variables.categoryId],
      });
      toast.success("Products updated successfully!");
    },
  });
};

// -------------- delete category --------------

export const useDeleteCategory_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory_Admin(categoryId),

    onSuccess: (_, categoryId) => {
      queryClient.invalidateQueries({ queryKey: ["categories", "admin"] });
      queryClient.removeQueries({
        queryKey: ["category", "admin", categoryId],
      });
      toast.success("Category deleted successfully!");
    },
    onError: (error) => {
      toast.error("Something went wrong while deleting category.");
    },
  });
};
