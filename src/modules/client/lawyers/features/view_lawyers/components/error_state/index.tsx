import { StatusMessage } from "@/components/ui";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Ups! Ocurrió un error inesperado"
      description="Ocurrió un error al cargar los abogados, intenta nuevamente, si el problema persiste, contacta al soporte."
      color="rose"
    />
  );
};
