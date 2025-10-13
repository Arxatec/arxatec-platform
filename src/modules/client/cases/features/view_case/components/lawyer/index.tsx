import { useQuery } from "@tanstack/react-query";
import { getLawyer } from "../../services";
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

interface Props {
  id: string;
}
const LoadingState = () => {
  return <Skeleton className="h-42 w-full" />;
};

const ErrorState = () => {
  return (
    <StatusMessage
      title="Ocurrio un error al cargar el abogado"
      description="Ocurrió un error al cargar el abogado, intenta nuevamente, si el problema persiste, contacta al soporte."
      color="rose"
    />
  );
};

export const Lawyer: React.FC<Props> = ({ id }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["lawyer", id],
    queryFn: () => getLawyer(id as string),
    enabled: !!id,
  });
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold font-serif mb-4">
          Información del abogado
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
                    {data.first_name.slice(0, 1)}
                    {data.last_name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Nombre y apellido
                  </span>
                  <span className="text-sm text-right">
                    {data.first_name} {data.last_name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Número de licencia
                  </span>
                  <span className="text-sm text-right">
                    {data.lawyer_details.license_number}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Especialidad
                  </span>
                  <span className="text-sm text-right">
                    {data.lawyer_details.specialty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Experiencia
                  </span>
                  <span className="text-sm text-right">
                    {data.lawyer_details.experience} años de experiencia
                  </span>
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
              </div>
            </div>
          )}
        </AsyncBoundary>
      </CardContent>
    </Card>
  );
};
