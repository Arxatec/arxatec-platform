import {
  AsyncBoundary,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
  StatusMessage,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { getExternalClient } from "../../services";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "lucide-react";

interface Props {
  id: string;
}

const LoadingState = () => {
  return <Skeleton className="h-42 w-full" />;
};

const ErrorState = () => {
  return (
    <StatusMessage
      title="Ocurrio un error al cargar el cliente"
      description="Ocurrió un error al cargar el cliente, intenta nuevamente, si el problema persiste, contacta al soporte."
      color="rose"
    />
  );
};

export const ExternalClient: React.FC<Props> = ({ id }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["external-client"],
    queryFn: () => getExternalClient(id),
  });

  const navigate = useNavigate();

  const handleUpdateExternalClient = (id: string) => {
    navigate(ROUTES.Lawyer.UpdateClient.replace(":id", id));
  };

  return (
    <div className="bg-card rounded-md p-4">
      <div className="mb-4 flex items-center gap-2 justify-between">
        <h2 className="text-xl font-bold font-serif">
          Información del cliente
        </h2>
        <Button
          variant="outline"
          onClick={() => handleUpdateExternalClient(id)}
        >
          <PencilIcon />
          Editar
        </Button>
      </div>
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={data}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => (
          <div className="grid grid-cols-[auto_1fr] gap-6">
            <div className="flex flex-col gap-4">
              <Avatar className="border size-42">
                {data.profile_image && <AvatarImage src={data.profile_image} />}
                <AvatarFallback className="uppercase text-primary">
                  {data.full_name.split(" ")[0][0]}
                  {data.full_name.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Nombre y apellido
                </span>
                <span className="text-sm text-right">{data.full_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Documento de identidad
                </span>
                <span className="text-sm text-right">{data.dni}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Correo electrónico
                </span>
                <span className="text-sm text-right">{data.email}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Número de contacto
                </span>
                <span className="text-sm text-right">{data.phone}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">Archivado</span>
                <span className="text-sm text-right">
                  {data.archived ? "Si" : "No"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Fecha de creación
                </span>
                <span className="text-sm text-right">
                  {formatDate(data.created_at, "dd 'de' MMMM 'del' yyyy", {
                    locale: es,
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
};
