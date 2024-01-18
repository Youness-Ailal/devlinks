import { getResetPassLink } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useForgetPass() {
  const { mutate: sendReset, status } = useMutation({
    mutationFn: getResetPassLink,
    onSuccess: () =>
      toast.success("Please check your email inbox", {
        icon: "✉️",
      }),
    onError: err => toast.error(err.message),
  });
  const isLoading = status === "pending";

  return { sendReset, isLoading };
}
