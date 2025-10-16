import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Skeleton,
} from "@/components/ui";
import { ArchiveIcon, Loader2, PencilIcon } from "lucide-react";
import { getExternalClient } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { useArchiveExternalClient } from "../../hooks";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import type { ExternalClient } from "@/types/client";

interface Props {
  id: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export const ClientDetailDrawer = ({
  id,
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) => {
  const navigate = useNavigate();
  const {
    data: client,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getExternalClient(id),
    enabled: !!id,
  });

  const { handleArchiveExternalClient } = useArchiveExternalClient();

  const onHandleArchiveClient = (client: ExternalClient) => {
    handleArchiveExternalClient(client);
    setIsDrawerOpen(false);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Detalles del cliente</SheetTitle>
        </SheetHeader>

        {isPending && (
          <div className="px-4 mt-4">
            <Skeleton className="size-20"></Skeleton>
            <Skeleton className="w-[70%] h-6 mt-2"></Skeleton>
            <Skeleton className="w-[50%] h-4 mt-1"></Skeleton>
          </div>
        )}

        {isError && (
          <div className="px-4 mt-4">
            <div className="bg-rose-500/10 p-4 rounded">
              <h2 className="text-lg font-serif font-bold text-rose-800">
                Ocurrio un error
              </h2>
              <p className="text-sm text-rose-700">{error?.message}</p>
            </div>
          </div>
        )}

        {client && (
          <div className="mt-4">
            <div className="px-4">
              <Avatar className="size-20">
                {client.profile_image && (
                  <AvatarImage src={client.profile_image} />
                )}
                <AvatarFallback className="uppercase text-primary text-lg">
                  {client.full_name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="w-full mt-2">
                <p className="font-medium text-base">{client.full_name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>

              <div className="flex gap-2 w-full items-center justify-center my-2">
                <Button
                  className="flex-1 border-none bg-accent"
                  variant="outline"
                  onClick={() =>
                    navigate(
                      ROUTES.Lawyer.UpdateClient.replace(":id", client.id)
                    )
                  }
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Editar</span>
                </Button>

                <Button
                  className="flex-1 border-none bg-accent"
                  variant="outline"
                  onClick={() => onHandleArchiveClient(client)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArchiveIcon className="w-4 h-4" />
                  )}
                  <span>{isPending ? "Archivando..." : "Archivar"}</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="px-4 py-1 border-b"></div>
              <div className="flex flex-col gap-2 px-4 mt-4">
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2 justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Documento de identidad
                    </span>
                    <span className="text-sm text-right">{client.dni}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Correo electrónico
                    </span>
                    <span className="text-sm text-right">{client.email}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Número de contacto
                    </span>
                    <span className="text-sm text-right">{client.phone}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Archivado
                    </span>
                    <span className="text-sm text-right">
                      {client.archived ? "Si" : "No"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Fecha de creación
                    </span>
                    <span className="text-sm text-right">
                      {formatDate(
                        client.created_at,
                        "dd 'de' MMMM 'del' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
