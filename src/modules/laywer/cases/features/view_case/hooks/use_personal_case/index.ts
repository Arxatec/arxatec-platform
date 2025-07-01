import { useQuery } from "@tanstack/react-query";
import { getPersonalCase } from "../../services";

export const usePersonalCase = (id: string) => {
  return useQuery({
    queryKey: ["personal-case", id],
    queryFn: () => getPersonalCase(id),
    enabled: !!id,
  });
};
