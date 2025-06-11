import { useQuery } from "@tanstack/react-query";
import { getArticleContent } from "../../services";

export const useArticleContent = (contentUrl: string | null) => {
  return useQuery<string>({
    queryKey: ["articleContent", contentUrl],
    queryFn: () => {
      if (!contentUrl) {
        throw new Error("No se encontró URL de contenido");
      }
      return getArticleContent(contentUrl);
    },
    enabled: false,
  });
};
