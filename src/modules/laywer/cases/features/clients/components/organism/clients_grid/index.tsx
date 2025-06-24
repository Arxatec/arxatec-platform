import { CardClient } from "../../molecules";
import { useFilteredClients } from "../../../hooks";
import { ClientsGridSkeleton } from "../../atoms";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

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
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">Error al cargar los clientes</div>
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
        <ExclamationCircleIcon className="size-14 text-gray-300 mb-2" />
        <div className="text-base text-gray-900 text-center font-medium">
          No tienes clientes aún
        </div>
        <p className="text-gray-500 max-w-sm text-sm mt-2 text-center">
          Cuando tengas clientes asignados, aparecerán aquí para que puedas
          gestionarlos fácilmente.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {clients.map((client) => (
        <CardClient key={client.id} />
      ))}
    </div>
  );
};
