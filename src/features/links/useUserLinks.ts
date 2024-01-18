import { getUserLinksById } from "@/services/linksApi";
import { useQuery } from "@tanstack/react-query";

export function useUserLinks(id: string) {
  const {
    data: links,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getUserLinksById(id),
    retry: false,

    queryKey: ["userlinks"],
  });

  return { links, isLoading, isError };
}
