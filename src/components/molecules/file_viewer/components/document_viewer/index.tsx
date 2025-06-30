import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";
import { downloadFile, getFileSize } from "~/utilities";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file?: File;
  preview?: string;
  url?: string;
};

interface DocumentViewerProps {
  fileData: FileData;
  canDownload?: boolean;
  onClose: () => void;
}

const getCategoryName = (categoryId: string): string => {
  const categories: Record<string, string> = {
    legal: "Evidencia",
    medical: "Documento legal",
    financial: "Contrato",
    personal: "Identificación",
    other: "Correspondencia",
  };
  return categories[categoryId] || "Sin categoría";
};

export const DocumentViewer = ({
  fileData,
  canDownload = true,
  onClose,
}: DocumentViewerProps) => {
  const getFileTypeDisplay = (type?: string): string => {
    if (!type) return "Documento";
    if (type.includes("word")) return "Documento de Word";
    if (type.includes("excel") || type.includes("spreadsheet"))
      return "Hoja de cálculo de Excel";
    return "Documento";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 w-full">
        <div className="text-base font-semibold leading-6 text-gray-900 truncate">
          {fileData.label}
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={onClose}
        >
          <span className="sr-only">Cerrar</span>
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="text-center">
        <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">{fileData.label}</h3>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-2">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tipo: {getFileTypeDisplay(fileData.file?.type)}
        </p>
        <p className="text-sm text-gray-500">Tamaño: {getFileSize(fileData)}</p>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 max-w-md">
        <p className="text-sm text-sky-800">
          Para ver este documento, descárgalo y ábrelo con la aplicación
          apropiada (Microsoft Word o Excel).
        </p>
      </div>

      {canDownload && (
        <PrimaryButton onClick={() => downloadFile(fileData)}>
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Descargar documento
        </PrimaryButton>
      )}
    </div>
  );
};
