import { Users } from "@/features/dashboard/pages/users/columns"; // تأكد من مسار الـ Type
import {
  deleteUserAdmin,
  getUserAdmin,
  getUsersAdmin,
  toggleUserBlockAdmin,
  updateUserAdmin,
} from "@/services/adminServices/users.service";
import { User } from "@/types/auth/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ==========================================
// 1. جلب كل المستخدمين (Get Users)
// ==========================================
export const useGetUsersAdmin = () => {
  return useQuery({
    queryKey: ["users"], // هذا المفتاح هو الذي سنستخدمه لتحديث البيانات في الخلفية
    queryFn: getUsersAdmin,
  });
};
// ==========================================
// 6. جلب مستخدم واحد فقط (Get Users)
// ==========================================
export const useGetUserAdmin = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => getUserAdmin(userId),
  });
};

// ==========================================
// 2. تعديل بيانات المستخدم (Update User)
// ==========================================
export const useUpdateUserAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // ملاحظة: useMutation يقبل مُدخل واحد (variable)، لذلك جمعنا userId و updatedData في Object
    mutationFn: ({
      userId,
      updatedData,
    }: {
      userId: string;
      updatedData: Partial<Users>;
    }) => updateUserAdmin(userId, updatedData),

    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Something went wrong while updating user.");
      console.error(error);
    },
  });
};

// ==========================================
// 3. حذف المستخدم (Delete User)
// ==========================================
export const useDeleteUserAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserAdmin(userId),

    onSuccess: () => {
      toast.success("User deleted successfully!");
      // تحديث الجدول فوراً بعد الحذف
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Something went wrong while deleting user.");
      console.error(error);
    },
  });
};

// ==========================================
// 4. حظر / فك حظر المستخدم (Toggle Block)
// ==========================================
export const useToggleUserBlockAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => toggleUserBlockAdmin(userId),

    onSuccess: (isBlocked) => {
      if (isBlocked) {
        toast.success("User blocked successfully!");
      } else {
        toast.success("User activated successfully!");
      }
      // تحديث الجدول فوراً
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Something went wrong while toggling block status.");
      console.error(error);
    },
  });
};
