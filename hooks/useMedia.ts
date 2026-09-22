import { uploadMedia_Admin } from "@/services/adminServices/media.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: { file: File }) => {
      return uploadMedia_Admin(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
    onError: () => {
      toast.error("Failed upload media", {});
    },
  });
};
