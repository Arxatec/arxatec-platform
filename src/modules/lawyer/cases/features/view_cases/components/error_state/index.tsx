import { StatusMessage } from "@/components/ui";

interface Props {
  error?: string;
}

export const ErrorState = ({ error }: Props) => {
  return (
    <StatusMessage
      title="Ocurrio un error al cargar los casos"
      description={
        error ||
        "Ocurrió un error al cargar los casos, intenta nuevamente, si el problema persiste, contacta al soporte."
      }
      color="rose"
    />
  );
};
