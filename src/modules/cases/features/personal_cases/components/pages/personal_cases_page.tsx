import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useCasesStore } from "../../../../store/cases.store";
import type { Case } from "../../../../store/cases.store";
import { CasesTable } from "../molecules/cases_table";
import { FolderIcon } from "@heroicons/react/24/outline";

const PersonalCasesPage = () => {
  const { changeTitle } = useTitle();
  const { cases, updateCaseStatus, deleteCase } = useCasesStore();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");

    // Obtener datos del localStorage
    const storedCaseData = localStorage.getItem("case-storage");
    if (storedCaseData) {
      try {
        const parsedData = JSON.parse(storedCaseData);
        if (parsedData.state) {
          // Crear un nuevo caso con los datos del localStorage
          const newCase: Case = {
            id: Date.now(),
            title: parsedData.state.title,
            description: parsedData.state.description,
            category: parsedData.state.category,
            files: parsedData.state.files || [],
            status: "pending",
            createdAt: new Date().toISOString(),
            // Cliente por defecto
            client: {
              id: 1,
              name: "Cliente por defecto",
              phone: "",
              email: "",
              role: "client",
              url: "",
              imageUrl: "",
            },
          };

          // Actualizar el store con el nuevo caso
          useCasesStore.setState((state) => ({
            cases: [...state.cases, newCase],
          }));

          // Limpiar el localStorage después de guardar en el store
          localStorage.removeItem("case-storage");
        }
      } catch (error) {
        console.error("Error al parsear los datos del localStorage:", error);
      }
    }
  }, [changeTitle]);

  const hasNoCases = cases.length === 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen rounded-lg mx-auto max-w-7xl">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Mis Casos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos tus casos legales y su estado actual
          </p>
        </div>
      </div>

      {hasNoCases ? (
        <div className="mt-6 text-center">
          <FolderIcon
            className="mx-auto h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No hay casos
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Comienza creando un nuevo caso legal.
          </p>
        </div>
      ) : (
        <CasesTable
          cases={cases}
          onStatusChange={updateCaseStatus}
          onDelete={deleteCase}
        />
      )}
    </div>
  );
};

export default PersonalCasesPage;
