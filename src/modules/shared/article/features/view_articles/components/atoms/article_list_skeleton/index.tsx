import { ArticleSkeleton } from "../article_skeleton";

export const ArticleListSkeleton = ({ isLoading }: { isLoading: boolean }) =>
  isLoading && (
    <>
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
    </>
  );
