import {
  CreateBrand_Admin,
  deleteBrand_Admin,
  getBrand_Admin,
  getBrands_Admin,
  getRelatedProductsByBrand_Admin,
  UpdateBrand_Admin,
  updateBrandProducts_Admin,
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

export const useGetBrands_Admin = () => {
  return useQuery({
    queryKey: ["brands", "admin"],
    queryFn: () => getBrands_Admin(),
  });
};

// -------------- get brand --------------

export const useGetBrand_Admin = (brandId: number) => {
  return useQuery<ResBrandType>({
    queryKey: ["brand", "admin", brandId],
    queryFn: () => getBrand_Admin(brandId),
  });
};

// -------------- get related products by brand --------------

export const useGetRelatedProductsByBrand_Admin = (brandId?: number) => {
  return useQuery({
    queryKey: ["relatedProductByBrand", "admin", brandId],
    queryFn: () => getRelatedProductsByBrand_Admin(brandId!),
    enabled: !!brandId,
  });
};

// -------------- Create brand --------------

export const useCreateBrand_Admin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReqCreateBrandType) => {
      return CreateBrand_Admin(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      toast.success("Brand created successfully!");
    },
    onError: () => {
      toast.error("Brand create faild!");
    },
  });
};

// -------------- Update brand --------------

export const useUpdateBrand_Admin = () => {
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
      return UpdateBrand_Admin(brandId, updatedData);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      queryClient.invalidateQueries({
        queryKey: ["brand", "admin", variables.brandId],
      });
      queryClient.invalidateQueries({
        queryKey: ["relatedProductByBrand", "admin", variables.brandId],
      });
      toast.success("Brand updated successfully!");
    },
    onError: () => {
      toast.error("Brand update faild!");
    },
  });
};

// -------------- update products brand --------------

interface UpdateBrandProductsParams_Admin {
  brandId: number;
  productIds: number[];
}

export const useUpdateBrandProducts_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, productIds }: UpdateBrandProductsParams_Admin) =>
      updateBrandProducts_Admin(brandId, productIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands", "admin"] });
      queryClient.invalidateQueries({
        queryKey: ["relatedProductByBrand", "admin", variables.brandId],
      });
      toast.success("Brand products updated successfully!");
    },
    onError: () => {
      toast.error("Brand products update faild!");
    },
  });
};

// -------------- delete brand --------------

export const useDeleteBrand_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: number) => deleteBrand_Admin(brandId),

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
      toast.success("Brand deleted successfully!");
    },
    onError: (error) => {
      toast.error("Brand delete faild!");
    },
  });
};
