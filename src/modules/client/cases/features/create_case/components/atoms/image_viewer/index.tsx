import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface ImageViewerProps {
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

export const ImageViewer = ({ fileData }: ImageViewerProps) => {
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
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-h-96 overflow-hidden rounded-lg border border-gray-200">
        <img
          src={fileData.preview || ""}
          alt={fileData.label}
          className="w-full max-h-96 object-cover"
        />
      </div>

      <div className="text-center">
        <p className="text-base font-medium text-gray-900">{fileData.label}</p>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-1">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500">
          Tamaño: {formatFileSize(fileData.file.size)}
        </p>
      </div>
      <div className="flex justify-center w-full">
        <PrimaryButton onClick={downloadFile}>
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Descargar
        </PrimaryButton>
      </div>
    </div>
  );
};
