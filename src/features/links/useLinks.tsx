import { getUserLinks } from "@/services/linksApi";
import { useQuery } from "@tanstack/react-query";

export function useLinks() {
  const { data: links, isLoading } = useQuery({
    queryFn: getUserLinks,
    queryKey: ["links"],
  });

  return { links, isLoading };
}
