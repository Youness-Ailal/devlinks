import { updateUserLinks } from "@/services/linksApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUserLinks() {
  const queryClient = useQueryClient();
  const { mutate: updateLinks, status } = useMutation({
    mutationFn: updateUserLinks,
    mutationKey: ["links"],
    onSuccess: data => {
      queryClient.setQueryData(["links"], data.links);
      toast.success("Your links have been successfully updated");
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

  return { updateLinks, status };
}
