import { useQuery } from "@tanstack/react-query";
import { getLawyers } from "../../services";

export const useGetLawyers = () => {
  return useQuery({
    queryKey: ["lawyers"],
    queryFn: getLawyers,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
