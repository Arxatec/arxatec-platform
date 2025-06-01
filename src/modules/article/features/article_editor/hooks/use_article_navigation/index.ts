import { useCallback, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import type { RouteParams } from "../../models";

export const useArticleNavigation = () => {
  const [location, setLocation] = useLocation();
  const params = useParams<RouteParams>();

  const isCreate = useMemo(() => location.includes("crear"), [location]);
  const articleId = params.id;
  const contentUrl = useMemo(
    () =>
      typeof window !== "undefined" ? window.history.state?.content : null,
    []
  );

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return {
    isCreate,
    articleId,
    contentUrl,
    setLocation,
    onBack,
  };
};
