import { CardClient } from "../../molecules";
import { useFilteredClients } from "../../../hooks";
import { ClientsGridSkeleton } from "../../atoms";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CustomStatusState } from "~/components/atoms";

export const ClientsGrid = () => {
  const {
    data: clients,
    isLoading,
    error,
  } = useFilteredClients({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });

  if (isLoading) {
    return <ClientsGridSkeleton />;
  }

  if (error) {
    return (
      <CustomStatusState
        icon={
          <ExclamationTriangleIcon className="size-10 text-gray-300 mb-2" />
        }
        title="Error al cargar los clientes"
        message="Sucedió un error al cargar los clientes, por favor intente nuevamente, si el problema persiste, por favor contacte al soporte."
      />
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <CustomStatusState
        title="No tienes clientes aún"
        message="Cuando tengas clientes asignados, aparecerán aquí para que puedas gestionarlos fácilmente."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {clients.map((client) => (
        <CardClient client={client} key={client.id} />
      ))}
    </div>
  );
};
