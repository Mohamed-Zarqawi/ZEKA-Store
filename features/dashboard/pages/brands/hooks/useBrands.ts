import {
  CreateAdminBrand,
  deleteBrandAdmin,
  getAdminBrand,
  getAdminBrands,
  getAdminRelatedProductsByBrand,
  UpdateAdminBrand,
  updateBrandProducts,
} from "@/services/adminServices/brands.service";
import { ReqCreateBrandType, ResBrandType } from "@/types/admin/brand";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// -------------- get brands --------------

export const useGetAdminBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getAdminBrands(),
  });
};

// -------------- get brand --------------

export const useGetAdminBrand = (brandId: number) => {
  return useQuery<ResBrandType>({
    queryKey: ["brand", brandId],
    queryFn: () => getAdminBrand(brandId),
  });
};

// -------------- update products brand --------------

interface UpdateCategoryProductsParams {
  brandId: number;
  productIds: number[];
}

export const useUpdateAdminBrandsProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, productIds }: UpdateCategoryProductsParams) =>
      updateBrandProducts(brandId, productIds),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// -------------- get related products by brand --------------

export const useGetAdminRelatedProductsByBrand = (brandId?: number) => {
  return useQuery({
    queryKey: ["brands", brandId],
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
        queryKey: ["brands"],
      });

      queryClient.removeQueries({
        queryKey: ["brands", brandId],
      });
    },
    onError: (error) => {
      toast.error("Something went wrong while deleting brand.");
      console.error(error);
    },
  });
};

// -------------- Create brand --------------

export const useCreateCategoryAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (body: ReqCreateBrandType) => {
      return CreateAdminBrand(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Brands created successfully!");
      router.push("/admin/brands");
    },
    onError: () => {
      toast.error("Create brands faild", {});
    },
  });
};

// -------------- Update category --------------

export const useUpdateAdminBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      brandId,
      updatedData,
    }: {
      brandId: number;
      updatedData: ResBrandType;
    }) => {
      return UpdateAdminBrand(brandId, updatedData);
    },

    onSuccess: () => {
      toast.success("Brand updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/admin/brands");
    },
    onError: () => {
      toast.error("Failed to update brands!");

      toast.error("Update brands faild!");
    },
  });
};
