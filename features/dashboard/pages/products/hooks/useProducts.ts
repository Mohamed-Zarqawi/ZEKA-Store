import {
  CreateAdminProduct,
  DeleteAdminProduct,
  getAdminBrands,
  getAdminCategories,
  getAdminProduct,
  getAdminProducts,
  UpdateAdminProduct,
} from "@/services/adminServices/products.service";
import { ReqCreateProductType } from "@/types/admin/product";
import { ProductType } from "@/types/shop/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "../columns";

export const useGetAdminProducts = (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  return useQuery({
    queryKey: [
      "products",
      page,
      categories.join(","),
      brands.join(","),
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getAdminProducts(page, categories, brands, minPrice, maxPrice),
  });
};

export const useGetAdminProduct = (productId: string) => {
  return useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: () => getAdminProduct(productId),
  });
};

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => DeleteAdminProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateAdminProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      updatedData,
    }: {
      productId: string;
      updatedData: Partial<Product>;
    }) => {
      return UpdateAdminProduct(productId, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Invalid email or password, register first", {
        action: {
          label: "Register",
          onClick: () => router.push("/signup"),
        },
      });
    },
  });
};

export const useCreateAdminProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ReqCreateProductType) => {
      return CreateAdminProduct(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Invalid email or password, register first", {
        action: {
          label: "Register",
          onClick: () => router.push("/signup"),
        },
      });
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
