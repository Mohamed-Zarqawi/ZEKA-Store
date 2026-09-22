import {
  CreateAdminBrand,
  deleteBrandAdmin,
  getAdminBrand,
  getAdminBrands,
  getAdminRelatedProductsByBrand,
  UpdateAdminBrand,
  updateBrandProducts,
} from "@/services/adminServices/brands.service";
import {
  ReqCreateBrandType,
  ReqUpdateBrandType,
  ResBrandType,
} from "@/types/admin/brand";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// -------------- get brands --------------

export const useGetAdminBrands = () => {
  return useQuery({
    queryKey: ["brands", "admin"],
    queryFn: () => getAdminBrands(),
  });
};

// -------------- get brand --------------

export const useGetAdminBrand = (brandId: number) => {
  return useQuery<ResBrandType>({
    queryKey: ["brand", "admin", brandId],
    queryFn: () => getAdminBrand(brandId),
  });
};

// -------------- update products brand --------------

interface UpdateBrandProductsParams {
  brandId: number;
  productIds: number[];
}

export const useUpdateAdminBrandsProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, productIds }: UpdateBrandProductsParams) =>
      updateBrandProducts(brandId, productIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      queryClient.invalidateQueries({
        queryKey: ["relatedProductByBrand", "admin", variables.brandId],
      });
    },
  });
};

// -------------- get related products by brand --------------

export const useGetAdminRelatedProductsByBrand = (brandId?: number) => {
  return useQuery({
    queryKey: ["relatedProductByBrand", "admin", brandId],
    queryFn: () => getAdminRelatedProductsByBrand(brandId!),
    enabled: !!brandId,
  });
};

// -------------- delete brand --------------

export const useDeleteBrandAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: number) => deleteBrandAdmin(brandId),

    onSuccess: (_, brandId) => {
      toast.success("Brand deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brands", "admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["relatedBrands", "admin", brandId],
      });

      queryClient.removeQueries({
        queryKey: ["brand", brandId],
      });
    },
    onError: (error) => {
      toast.error("Something went wrong while deleting brand.");
    },
  });
};

// -------------- Create brand --------------

export const useCreateBrandAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReqCreateBrandType) => {
      return CreateAdminBrand(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      toast.success("Brands created successfully!");
    },
    onError: () => {
      toast.error("Create brands faild", {});
    },
  });
};

// -------------- Update brand --------------

export const useUpdateAdminBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      brandId,
      updatedData,
    }: {
      brandId: number;
      updatedData: ReqUpdateBrandType;
    }) => {
      return UpdateAdminBrand(brandId, updatedData);
    },

    onSuccess: (_, variables) => {
      toast.success("Brand updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      queryClient.invalidateQueries({
        queryKey: ["brand", "admin", variables.brandId],
      });
      router.push("/admin/brands");
    },
    onError: () => {
      toast.error("Failed to update brands!");

      toast.error("Update brands faild!");
    },
  });
};
