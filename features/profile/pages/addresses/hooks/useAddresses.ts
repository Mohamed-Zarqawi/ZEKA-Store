import {
  addAddress,
  deleteAddress,
  getAddresses,
  getAddressItem,
  updateAddress,
} from "@/services/addressesServices/addresses.service";
import { AddressType } from "@/types/profile/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetAddresses = (userId?: string) => {
  return useQuery<AddressType[]>({
    queryKey: ["addresses", userId],
    enabled: !!userId,
    queryFn: () => getAddresses(userId!),
  });
};

export const useGetAddress = (addressId: string) => {
  return useQuery<AddressType>({
    queryKey: ["addressItem", addressId],
    queryFn: () => getAddressItem(addressId),
  });
};

export const useAddAddress = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      addressData,
    }: {
      userId: string;
      addressData: AddressType;
    }) => addAddress(userId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.push("/profile/addresses"); // تحويل المستخدم بعد الإضافة
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      action,
      addressId,
      addressData,
    }: {
      action: string;
      addressId: string;
      addressData: Partial<AddressType>;
    }) => updateAddress(addressId, addressData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      {
        variables.action == "pin"
          ? toast.success(`Address Seted As Default Successfully!`, {})
          : toast.success("Address Updated Successfully !", {});
      }
    },
    onError: () => {
      toast.error("Could not update Address, please try again later.", {});
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
