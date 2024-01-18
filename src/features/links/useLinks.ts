import { getUserLinksByUserId } from "@/services/linksApi";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../auth/useUser";

export function useLinks() {
  const { user } = useUser();

  const { data: links, isLoading } = useQuery({
    queryFn: () => getUserLinksByUserId(user.id),
    queryKey: ["links"],
  });

  return { links, isLoading };
}
