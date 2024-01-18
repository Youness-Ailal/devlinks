import { signInApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export type LogingCreds = {
  email: string;
  password: string;
};
export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signin, status } = useMutation({
    mutationFn: ({ email, password }: LogingCreds) =>
      signInApi({ email, password }),
    onSuccess: user => {
      toast.success("Success! You have logged in");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: err =>
      toast.error(err.message, {
        iconTheme: {
          primary: "var(--color-red-500)",
          secondary: "var(--color-grey-50)",
        },
      }),
  });
  return { signin, status };
}
