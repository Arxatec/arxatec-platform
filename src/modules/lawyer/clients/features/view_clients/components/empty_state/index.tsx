import { StatusMessage } from "@/components/ui";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No se encontraron clientes"
      description="Si quieres crear un cliente, puedes hacerlo en el botón que se encuentra en la parte superior derecha, o también puedes tomar un caso en explorar casos."
      color="white"
    />
  );
};
