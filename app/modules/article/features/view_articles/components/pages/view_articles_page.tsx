import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  CustomInput,
  CustomSelector,
  PrimaryButton,
  SpinnerLoader,
} from "~/components/atoms";
import { CardArticle } from "../molecules";
import { useNavigate } from "react-router";
import { APP_PATHS } from "~/routes/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "../../services";
import { useEffect, useRef, useCallback, useState } from "react";
import { useDebounce } from "~/hooks/";

const ArticleSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex gap-4">
      <div className="w-32 h-32 bg-gray-100 rounded-md"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export default function ViewArticles() {
  const navigate = useNavigate();
  const navigateToCreateArticle = () => navigate(APP_PATHS.CREATE_ARTICLE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState({
    id: 3,
    name: "Más recientes",
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["articles", debouncedSearchTerm, selectedSort.id],
    queryFn: ({ pageParam = 1 }) =>
      getArticles({
        page: pageParam as number,
        limit: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.currentPage < lastPage.data.totalPages) {
        return lastPage.data.currentPage + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, selectedSort.id, refetch]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option: { id: number; name: string }) => {
    setSelectedSort(option);
  };

  const allArticles = data?.pages.flatMap((page) => page.data.data) || [];

  const filteredArticles = searchTerm
    ? allArticles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allArticles;

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (selectedSort.id) {
      case 1:
        return a.title.localeCompare(b.title);
      case 2:
        return (
          new Date(a.publication_timestamp).getTime() -
          new Date(b.publication_timestamp).getTime()
        );
      case 3:
        return (
          new Date(b.publication_timestamp).getTime() -
          new Date(a.publication_timestamp).getTime()
        );
      case 4:
        return b.reading_time - a.reading_time;
      default:
        return 0;
    }
  });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full min-h-screen">
      <div className="bg-white px-4 py-4 rounded-md mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Todos los articulos
          </h2>
          <PrimaryButton
            className="text-sm flex items-center gap-2"
            onClick={navigateToCreateArticle}
          >
            <PlusIcon className="size-4 text-white" strokeWidth={2} />
            Nuevo articulo
          </PrimaryButton>
        </div>
        <div className="mt-4 flex gap-2 w-full items-center">
          <div className="w-full">
            <CustomInput
              placeholder="Buscar por título..."
              className="w-full"
              value={searchTerm}
              onChange={handleSearchChange}
              startAdornment={
                <MagnifyingGlassIcon className="size-4 text-gray-400" />
              }
            />
          </div>
          <div className="flex">
            <div className="w-44">
              <CustomSelector
                options={[
                  { id: 1, name: "Alfabético" },
                  { id: 2, name: "Más antiguos" },
                  { id: 3, name: "Más recientes" },
                  { id: 4, name: "Más leídos" },
                ]}
                selected={selectedSort}
                onChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading && (
          <>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <p className="text-red-600 font-medium">
              Error al cargar los artículos
            </p>
            <p className="text-red-500 text-sm mt-1">
              Por favor, intenta nuevamente más tarde
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          sortedArticles.map((article) => (
            <CardArticle
              key={article.id}
              article={article}
              onView={(id) => console.log("Ver artículo:", id)}
              onEdit={(id) => console.log("Editar artículo:", id)}
              onDelete={(id) => console.log("Eliminar artículo:", id)}
            />
          ))}

        <div ref={loadMoreRef}>
          {isFetchingNextPage && (
            <div className="flex justify-center py-4 w-full">
              <SpinnerLoader color="#334155" size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
