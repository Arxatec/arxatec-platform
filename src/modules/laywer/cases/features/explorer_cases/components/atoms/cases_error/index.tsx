import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";

interface CasesErrorProps {
  error: Error;
  onRetry: () => void;
}

export const CasesError = ({ error, onRetry }: CasesErrorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error al cargar los casos
        </h3>
        <p className="text-gray-600 mb-6">
          {error.message || "Ocurrió un error inesperado al cargar los datos."}
        </p>
        <PrimaryButton onClick={onRetry}>Intentar nuevamente</PrimaryButton>
      </div>
    </div>
  );
};
