import {
  CreateAdminProduct,
  getAdminBrands,
  getAdminCategories,
  getAdminProduct,
  getAdminProducts,
  ToggleDeleteAdminProduct,
  UpdateAdminProduct,
} from "@/services/adminServices/products.service";
import { ReqCreateProductType } from "@/types/admin/product";
import { ProductType } from "@/types/shop/product";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAdminProducts = (
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
      { page, categories, brands, minPrice, maxPrice, search },
    ],
    queryFn: () =>
      getAdminProducts(page, categories, brands, minPrice, maxPrice, search),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminProduct = (productId: string) => {
  return useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: () => getAdminProduct(productId),
  });
};

export const useToggleDeleteAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => ToggleDeleteAdminProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      updatedData,
    }: {
      productId: string;
      updatedData: Partial<ProductType>;
    }) => {
      return UpdateAdminProduct(productId, updatedData);
    },

    onSuccess: () => {
      toast.success("Product updated successfully!", {});

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to update product!", {});

      toast.error("Update Product Faild", {});
    },
  });
};

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ReqCreateProductType) => {
      return CreateAdminProduct(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Create Product Faild", {});
    },
  });
};

export const useGetAdminCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAdminCategories(),
  });
};

export const useGetAdminBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getAdminBrands(),
  });
};
