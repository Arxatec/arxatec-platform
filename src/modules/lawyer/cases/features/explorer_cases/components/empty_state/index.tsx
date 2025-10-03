import { StatusMessage } from "@/components/ui";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No se encontraron casos"
      description="No se encontraron casos que un cliente haya creado, podrías volver dentro de un momento."
      color="white"
    />
  );
};
