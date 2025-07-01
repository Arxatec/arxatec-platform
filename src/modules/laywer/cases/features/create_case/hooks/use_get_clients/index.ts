import { useQuery } from "@tanstack/react-query";
import { getExternalClients } from "../../services";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getExternalClients,
    retry: 1,
  });
};
