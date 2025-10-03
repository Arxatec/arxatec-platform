import { StatusMessage } from "@/components/ui";

interface Props {
  error?: string;
}

export const ErrorState = ({ error }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-serif mt-4 mb-8">
        Editar cliente
      </h1>
      <StatusMessage
        title="Ocurrio un error al cargar el cliente"
        description={
          error ||
          "Ocurrió un error al cargar el cliente, intenta nuevamente, si el problema persiste, contacta al soporte."
        }
        color="rose"
      />
    </div>
  );
};
