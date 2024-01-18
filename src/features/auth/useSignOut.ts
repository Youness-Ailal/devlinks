import { useLinksContext } from "@/context/LinksContext";
import { signOut as signOutApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useSignOut() {
  const navigate = useNavigate();
  const { resetPreviewLinks } = useLinksContext();
  const { mutate: signOut, status } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      toast.success("Success! You have logged out");
      resetPreviewLinks();
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
  return { signOut, status };
}
