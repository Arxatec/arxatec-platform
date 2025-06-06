import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useClientsStore } from "../../../create_case/store/clients.store";
import { ClientCard } from "../molecules";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { CreateClientModal } from "../../../create_case/components/molecules/create_client_modal";
import { useState } from "react";

export default function ClientsPage() {
  const { changeTitle } = useTitle();
  const clients = useClientsStore((state) => state.clients);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    changeTitle("Clientes - Arxatec");
  }, [changeTitle]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen rounded-lg mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tus clientes y su información
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <UserPlusIcon className="size-5" />
          Nuevo cliente
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12">
          <UserPlusIcon className="size-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No hay clientes
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Comienza agregando tu primer cliente
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <UserPlusIcon className="size-5" />
              Nuevo cliente
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      <CreateClientModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onClientCreated={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
