import { updatePassword } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdatePassword() {
  const navigate = useNavigate();

  const { mutate: update, status } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Your password has been successfuly updated");
      navigate("/signin");
    },
    onError: err =>
      toast.error(err.message, {
        duration: 3000,
        iconTheme: {
          primary: "var(--color-red-500)",
          secondary: "var(--color-grey-100)",
        },
      }),
  });

  return { update, status };
}
