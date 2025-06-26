import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const DashboardError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-md mx-auto">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-400 mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Salió un error
        </h3>
        <p className="text-gray-600 mb-6">
          No pudimos cargar la información del dashboard. Por favor, intenta
          nuevamente más tarde.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
};
