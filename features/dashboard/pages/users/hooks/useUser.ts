import { Users } from "@/features/dashboard/pages/users/columns"; // تأكد من مسار الـ Type
import {
  deleteAddress_Admin,
  deleteUser_Admin,
  getUser_Admin,
  getUsers_Admin,
  toggleUserBlock_Admin,
  updateUser_Admin,
} from "@/services/adminServices/users.service";
import { User } from "@/types/auth/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// -------------- get users --------------

export const useGetUsers_Admin = () => {
  return useQuery({
    queryKey: ["users", "admin"],
    queryFn: getUsers_Admin,
  });
};

// -------------- get user --------------

export const useGetUser_Admin = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", "admin", userId],
    queryFn: () => getUser_Admin(userId),
  });
};

// -------------- update user --------------

export const useUpdateUser_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      updatedData,
    }: {
      userId: string;
      updatedData: Partial<Users>;
    }) => updateUser_Admin(userId, updatedData),

    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "admin", variables.userId],
      });
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error("User update faild!");
    },
  });
};

// -------------- block user --------------

export const useToggleUserBlock_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => toggleUserBlock_Admin(userId),

    onSuccess: (isBlocked, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "admin", userId],
      });

      if (isBlocked) {
        toast.success("User blocked successfully!");
      } else {
        toast.success("User activated successfully!");
      }
    },
    onError: () => {
      toast.error("User block faild!");
    },
  });
};

// -------------- delete users --------------

export const useDeleteUser_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser_Admin(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "admin"],
      });

      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      toast.error("User delete faild!");
    },
  });
};

// -------------- delete user address  --------------

export const useDeleteAddress_Admin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      addressId,
    }: {
      userId: string;
      addressId: string;
    }) => deleteAddress_Admin(addressId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "admin", variables.userId],
      });
      toast.success("Address Deleted Successfully!");
    },
  });
};
