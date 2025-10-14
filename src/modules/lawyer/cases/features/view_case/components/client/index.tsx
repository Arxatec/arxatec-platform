import {
  AsyncBoundary,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Skeleton,
  StatusMessage,
} from "@/components/ui";
import { getClient } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
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

export const Client: React.FC<Props> = ({ id }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["client"],
    queryFn: () => getClient(id),
    enabled: !!id,
  });

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold font-serif mb-4">
          Información del cliente
        </h2>
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
                  {data.profile_image && (
                    <AvatarImage src={data.profile_image} />
                  )}
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
                    Correo electrónico
                  </span>
                  <span className="text-sm text-right">{data.email}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Número de contacto
                  </span>
                  <span className="text-sm text-right">
                    {data.phone || "No especificado"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Ocupación
                  </span>
                  <span className="text-sm text-right">No especificado</span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Otro contacto
                  </span>
                  <span className="text-sm text-right">No especificado</span>
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
      </CardContent>
    </Card>
  );
};
