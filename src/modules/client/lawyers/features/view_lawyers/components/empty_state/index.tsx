import { StatusMessage } from "@/components/ui";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No se encontraron abogados"
      description="No se encontraron abogados, podrías volver dentro de un momento."
      color="white"
    />
  );
};
