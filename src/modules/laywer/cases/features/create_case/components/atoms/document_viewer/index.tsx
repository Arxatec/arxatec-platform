import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface DocumentViewerProps {
  fileData: FileData;
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

export const DocumentViewer = ({ fileData }: DocumentViewerProps) => {
  const downloadFile = () => {
    const url = URL.createObjectURL(fileData.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileData.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileTypeDisplay = (type: string): string => {
    if (type.includes("word")) return "Documento de Word";
    if (type.includes("excel") || type.includes("spreadsheet"))
      return "Hoja de cálculo de Excel";
    return "Documento";
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
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
          Tipo: {getFileTypeDisplay(fileData.file.type)}
        </p>
        <p className="text-sm text-gray-500">
          Tamaño: {formatFileSize(fileData.file.size)}
        </p>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 max-w-md">
        <p className="text-sm text-sky-800">
          Para ver este documento, descárgalo y ábrelo con la aplicación
          apropiada (Microsoft Word o Excel).
        </p>
      </div>

      <PrimaryButton onClick={downloadFile}>
        <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
        Descargar documento
      </PrimaryButton>
    </div>
  );
};
