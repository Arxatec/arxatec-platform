import { CustomAvatar } from "~/components/atoms";
import type { Case } from "../../../../create_case/store/cases.store";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CasesTableProps {
  cases: Case[];
  onStatusChange: (id: number, status: Case["status"]) => void;
  onDelete: (id: number) => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  caseName: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  caseName,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Estás seguro de que quieres eliminar este caso?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Vas a eliminar el caso "{caseName}". Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export const CasesTable = ({
  cases,
  onStatusChange,
  onDelete,
}: CasesTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleDeleteClick = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCase) {
      onDelete(selectedCase.id);
      setDeleteModalOpen(false);
      setSelectedCase(null);
    }
  };

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Categoría
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Fecha de creación
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Estado
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {caseItem.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      {caseItem.client && (
                        <CustomAvatar
                          avatar={caseItem.client.imageUrl || ""}
                          size="1.5rem"
                          altText={caseItem.client.name}
                          username={caseItem.client.name}
                        />
                      )}
                      <span>{caseItem.client?.name || "Sin cliente"}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {caseItem.category.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(new Date(caseItem.createdAt), "PPP", {
                      locale: es,
                    })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <select
                      value={caseItem.status}
                      onChange={(e) =>
                        onStatusChange(
                          caseItem.id,
                          e.target.value as Case["status"]
                        )
                      }
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in_progress">En progreso</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      onClick={() => handleDeleteClick(caseItem)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCase(null);
        }}
        onConfirm={handleConfirmDelete}
        caseName={selectedCase?.title || ""}
      />
    </div>
  );
};
