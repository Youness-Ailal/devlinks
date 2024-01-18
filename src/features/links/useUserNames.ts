import { getUsernames } from "@/services/linksApi";
import { useQuery } from "@tanstack/react-query";

export function useUserNames() {
  const { data: userNames, isLoading } = useQuery({
    queryFn: getUsernames,
    queryKey: ["usernames"],
  });

  return { userNames, isLoading };
}
