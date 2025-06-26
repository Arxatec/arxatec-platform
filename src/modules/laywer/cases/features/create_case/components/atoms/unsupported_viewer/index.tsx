import {
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface UnsupportedViewerProps {
  fileData: FileData;
}

const getCategoryName = (categoryId: string): string => {
  const categories: Record<string, string> = {
    legal: "Legal",
    medical: "Médico",
    financial: "Financiero",
    personal: "Personal",
    other: "Otro",
  };
  return categories[categoryId] || "Sin categoría";
};

export const UnsupportedViewer = ({ fileData }: UnsupportedViewerProps) => {
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

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-orange-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">{fileData.label}</h3>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-2">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tipo: {fileData.file.type || "Desconocido"}
        </p>
        <p className="text-sm text-gray-500">
          Tamaño: {formatFileSize(fileData.file.size)}
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md">
        <p className="text-sm text-orange-800">
          Este tipo de archivo no es compatible con la vista previa. Descarga el
          archivo para ver su contenido.
        </p>
      </div>

      <PrimaryButton onClick={downloadFile}>
        <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
        Descargar archivo
      </PrimaryButton>
    </div>
  );
};
