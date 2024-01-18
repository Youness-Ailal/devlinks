import { updateUser } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    // mutationFn: ({ firstName, lastName, avatar }: UserDataType) =>
    //   updateUser({ firstName, lastName, avatar }),
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your changes have been successfuly updated", {
        icon: "💾",
      });
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
