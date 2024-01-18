import { signUpApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export type SignUpCreds = {
  email: string;
  password: string;
};

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, status } = useMutation({
    mutationFn: ({ email, password }: SignUpCreds) =>
      signUpApi({ email, password }),
    onSuccess: user => {
      toast.success("Account created successfuly!");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: err =>
      toast.error(err.message, {
        iconTheme: {
          primary: "var(--color-red-500)",
          secondary: "var(--color-grey-50)",
        },
      }),
  });
  return { signUp, status };
}
