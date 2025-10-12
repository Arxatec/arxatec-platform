import { StatusMessage } from "@/components/ui";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No se encontraron casos"
      description="Si quieres crear un caso, puedes hacerlo en el botoón que se encuentra en la parte superior derecha."
      color="white"
    />
  );
};
