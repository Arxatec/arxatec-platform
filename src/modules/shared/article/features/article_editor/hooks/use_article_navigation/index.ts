import { useCallback, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export const useArticleNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const isCreate = useMemo(
    () => location.pathname.includes("crear"),
    [location.pathname]
  );
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
    navigate,
    onBack,
  };
};
