import { XMarkIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "~/components/atoms";

interface FilePreviewProps {
  id: string;
  name: string;
  type: string;
  onRemove: (id: string) => void;
  onView?: () => void;
}

const removeFileExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, "");
};

export const FilePreview = ({
  id,
  name,
  type,
  onRemove,
  onView,
}: FilePreviewProps) => {
  return (
    <div className="relative bg-gray-50 rounded-lg w-full flex max-w-[150px] hover:bg-gray-100 transition-colors items-center px-2">
      <button
        onClick={onView}
        className="flex items-center gap-2 p-2 w-full overflow-hidden rounded-lg"
        disabled={!onView}
      >
        <FileIcon fileType={type} />
        <span className="text-sm text-gray-700 truncate max-w-[200px] text-ellipsis text-overflow-hidden whitespace-nowrap">
          {removeFileExtension(name)}
        </span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className=" p-1 w-fit h-fit hover:bg-gray-200 rounded-full transition-all"
        aria-label="Eliminar archivo"
      >
        <XMarkIcon className="size-3 text-gray-500" />
      </button>
    </div>
  );
};
