import {
  CreateProduct_Admin,
  getBrands_Admin,
  getCategories_Admin,
  getProduct_Admin,
  getProducts_Admin,
  ToggleDeleteProduct_Admin,
  updateProduct_Admin,
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

// -------------- get products --------------

export const useGetProducts_Admin = (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
  search: string = "",
) => {
  return useQuery({
    queryKey: ["products", "admin"],
    queryFn: () =>
      getProducts_Admin(page, categories, brands, minPrice, maxPrice, search),
    placeholderData: keepPreviousData,
  });
};

// -------------- get product --------------

export const useGetProduct_Admin = (productId: string) => {
  return useQuery<ProductType>({
    queryKey: ["product", "admin", productId],
    queryFn: () => getProduct_Admin(productId),
  });
};

// -------------- get categories --------------

export const useGetCategories_Admin = () => {
  return useQuery({
    queryKey: ["categories", "admin"],
    queryFn: () => getCategories_Admin(),
  });
};

// -------------- get brands --------------

export const useGetBrands_Admin = () => {
  return useQuery({
    queryKey: ["brands", "admin"],
    queryFn: () => getBrands_Admin(),
  });
};

// -------------- create product --------------

export const useCreateProduct_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ReqCreateProductType) => {
      return CreateProduct_Admin(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "admin"],
      });
      toast.success("Product created successfully!");
    },
    onError: () => {
      toast.error("Product create faild!");
    },
  });
};

// -------------- update product --------------

export const useUpdateProduct_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      updatedData,
    }: {
      productId: string;
      updatedData: Partial<ProductType>;
    }) => {
      return updateProduct_Admin(productId, updatedData);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", "admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", "admin", variables.productId],
      });

      toast.success("Product updated successfully!");
    },
    onError: () => {
      toast.error(" Product update faild!");
    },
  });
};

// -------------- toggle delete product --------------

export const useToggleDeleteProduct_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => ToggleDeleteProduct_Admin(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "admin"],
      });
      toast.success("Product deleted successfully!");
    },
    onError: () => {
      toast.error("Product delete faild!");
    },
  });
};
