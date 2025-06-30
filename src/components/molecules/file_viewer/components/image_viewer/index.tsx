import { XMarkIcon } from "@heroicons/react/24/outline";
import { getFileSize } from "~/utilities";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file?: File;
  preview?: string;
  url?: string;
};

interface ImageViewerProps {
  fileData: FileData;
  onClose: () => void;
  canDownload?: boolean;
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

export const ImageViewer = ({
  fileData,
  onClose,
  canDownload = true,
}: ImageViewerProps) => {
  const getImageSrc = (): string => {
    if (fileData.preview) return fileData.preview;
    if (fileData.url) return fileData.url;
    return "";
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
      <div className="px-4 w-full">
        <div className="w-full max-h-96 overflow-hidden rounded-lg border border-gray-200 relative ">
          <img
            src={getImageSrc()}
            alt={fileData.label}
            className="w-full max-h-96 object-cover rounded-lg"
          />
          <div className="w-full h-full absolute left-0 backdrop-blur-2xl bg-black/10 z-10 top-0 rounded-lg"></div>
          <img
            src={getImageSrc()}
            alt={fileData.label}
            className=" object-contain absolute z-20 left-0 right-0 mx-auto top-0 h-96"
          />
        </div>
      </div>
      <div className="px-4 pb-6">
        <div className="text-center">
          <p className="text-base font-medium text-gray-900">
            {fileData.label}
          </p>
          {fileData.description && (
            <p className="text-sm text-gray-600 mt-1">{fileData.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Categoría: {getCategoryName(fileData.category_id)}
          </p>
          <p className="text-sm text-gray-500">
            Tamaño: {getFileSize(fileData)}
          </p>
        </div>
      </div>
    </div>
  );
};
