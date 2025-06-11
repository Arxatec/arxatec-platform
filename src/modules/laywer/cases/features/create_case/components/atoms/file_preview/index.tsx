import { XMarkIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "../file_icon";

interface FilePreviewProps {
  id: string;
  name: string;
  type: string;
  onRemove: (id: string) => void;
}

const removeFileExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, "");
};

export const FilePreview = ({ id, name, type, onRemove }: FilePreviewProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <FileIcon fileType={type} />
        <span className="text-sm text-gray-700 truncate max-w-[200px]">
          {removeFileExtension(name)}
        </span>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="p-1 hover:bg-gray-200 rounded-full transition-all"
        aria-label="Eliminar archivo"
      >
        <XMarkIcon className="size-4 text-gray-500" />
      </button>
    </div>
  );
};
