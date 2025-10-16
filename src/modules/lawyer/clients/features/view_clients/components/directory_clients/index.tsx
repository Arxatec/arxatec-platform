import {
  AsyncBoundary,
  PaginationController,
  Label,
  Input,
  ButtonGroup,
  Button,
} from "@/components/ui";
import { getExternalClients } from "../../services";
import { useQuery } from "@tanstack/react-query";
import {
  ErrorState,
  EmptyState,
  LoadingState,
  ClientDetailDrawer,
  GridClients,
  TableClients,
} from "..";
import { useState } from "react";
import { Grid, List } from "lucide-react";
import type { ExternalClient } from "@/types/client";
import { useArchiveExternalClient } from "../../hooks";
import { useDebounce } from "@/hooks";

export const DirectoryClients = () => {
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const { handleArchiveExternalClient } = useArchiveExternalClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["external-clients", page, debouncedSearch],
    queryFn: () => getExternalClients(page, debouncedSearch),
  });

  const handleViewDetails = (client: ExternalClient) => {
    setSelectedClientId(client.id);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div className="flex items-end gap-2 mb-4">
        <div className="w-full">
          <Label className="mb-2 block">Buscar cliente</Label>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ButtonGroup>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="size-4" />
          </Button>
        </ButtonGroup>
      </div>
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        ErrorComponent={<ErrorState error={error?.message} />}
        EmptyComponent={<EmptyState />}
        LoadingComponent={<LoadingState />}
        data={data?.clients ?? []}
      >
        {(clients) => (
          <>
            {viewMode === "list" ? (
              <TableClients
                clients={clients}
                handleViewDetails={handleViewDetails}
                handleArchiveExternalClient={handleArchiveExternalClient}
              />
            ) : (
              <GridClients
                clients={clients}
                handleViewDetails={handleViewDetails}
                handleArchiveExternalClient={handleArchiveExternalClient}
              />
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

      <ClientDetailDrawer
        id={selectedClientId!}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};
