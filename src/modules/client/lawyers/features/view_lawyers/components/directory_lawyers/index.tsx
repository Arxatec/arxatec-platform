import { AsyncBoundary, PaginationController } from "@/components/ui";
import { Filters, ErrorState, EmptyState, LoadingState } from "..";
import { getLawyers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks";
import { GridLawyers, TableLawyers } from "..";

export const DirectoryLawyers = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending, isError } = useQuery({
    queryKey: ["lawyers", page, debouncedSearch],
    queryFn: () => getLawyers(page, debouncedSearch),
  });

  return (
    <div>
      <Filters
        setSearch={setSearch}
        search={search}
        setView={setView}
        view={view}
      />
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
        LoadingComponent={<LoadingState />}
        data={data?.lawyers ?? []}
      >
        {(lawyers) => (
          <>
            {view === "list" ? (
              <TableLawyers lawyers={lawyers} />
            ) : (
              <GridLawyers lawyers={lawyers} />
            )}
            <div className="mt-4">
              <PaginationController
                setPage={setPage}
                pagination={
                  data?.pagination ?? {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 1,
                  }
                }
              />
            </div>
          </>
        )}
      </AsyncBoundary>
    </div>
  );
};
