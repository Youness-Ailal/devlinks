import { signIn } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type LogingCreds = {
  email: string;
  password: string;
};
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }: LogingCreds) =>
      signIn({ email, password }),
    onSuccess: user => {
      // toast.success("Success! You have logged in");
      queryClient.setQueryData(["user"], user?.user);
      navigate("/dashboard", { replace: true });
    },
    onError: err => toast.error(err.message),
  });
  return { login, status };
}
