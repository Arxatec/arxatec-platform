import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AsyncBoundary,
  PaginationController,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  Label,
  Input,
} from "@/components/ui";
import { getClients } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { ErrorState, EmptyState, LoadingState, ClientDetailDrawer } from "../";
import { useState } from "react";
import { ArchiveIcon, EyeIcon, PencilIcon } from "lucide-react";
import type { Client } from "@/types/client";
import { useArchiveClient } from "../../hooks";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks";

export const TableClients = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const { handleArchiveClient } = useArchiveClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clients", page, debouncedSearch],
    queryFn: () => getClients(page, debouncedSearch),
  });

  const handleViewDetails = (client: Client) => {
    setSelectedClientId(client.id);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-full">
          <Label className="mb-2 block">Buscar cliente</Label>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>Correo electrónico</TableHead>
                  <TableHead>Número de contacto</TableHead>
                  <TableHead>Documento de identidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <ContextMenu key={client.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow onClick={() => handleViewDetails(client)}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              {client.profile_image && (
                                <AvatarImage src={client.profile_image} />
                              )}
                              <AvatarFallback className="uppercase text-primary">
                                {client.full_name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {client.full_name}
                          </div>
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.dni}</TableCell>
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem
                        onClick={() => handleViewDetails(client)}
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Ver detalles</span>
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() =>
                          navigate(
                            ROUTES.Lawyer.UpdateClient.replace(":id", client.id)
                          )
                        }
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Editar</span>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        onClick={() => handleArchiveClient(client)}
                      >
                        <ArchiveIcon className="w-4 h-4" />
                        <span>Archivar</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TableBody>
            </Table>
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
