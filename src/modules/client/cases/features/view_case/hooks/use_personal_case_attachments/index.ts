import { useQuery } from "@tanstack/react-query";
import { getPersonalCaseAttachments } from "../../services";

export const usePersonalCaseAttachments = (id: string) => {
  return useQuery({
    queryKey: ["personal-case-attachments", id],
    queryFn: () => getPersonalCaseAttachments(id),
    enabled: !!id,
  });
};
