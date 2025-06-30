import { DocumentIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { FileDropzone } from "~/components/molecules";

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/json",
  "text/plain",
  "text/markdown",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/webp",
];

interface Props {
  onFilesChange: (files: { file: File; preview?: string }[]) => void;
}

export const DropzoneUploader: React.FC<Props> = ({ onFilesChange }) => {
  return (
    <div className="px-4 h-full">
      <FileDropzone
        accept={ALLOWED_FILE_TYPES}
        maxSizeMB={5}
        multiple={false}
        onFilesChange={onFilesChange}
      >
        {({ openFileDialog, isDragging, error }) => (
          <div
            className={twMerge(
              "relative mt-2 flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed p-12 text-center h-full",
              isDragging ? "border-blue-600 bg-blue-100" : "border-gray-300"
            )}
            onClick={openFileDialog}
          >
            <DocumentIcon
              className={twMerge(
                "size-8 transition-all",
                isDragging ? "text-blue-500 rotate-12" : "text-gray-400"
              )}
            />
            <span
              className={twMerge(
                "text-sm",
                isDragging ? "text-blue-600" : "text-gray-500"
              )}
            >
              Subir archivos
            </span>
            {!error ? (
              <span
                className={twMerge(
                  "text-xs",
                  isDragging ? "text-blue-600" : "text-gray-500"
                )}
              >
                Arrastra y suelta o haz clic (máx. 5 MB)
              </span>
            ) : (
              <p className="text-xs text-red-600 font-medium">{error}</p>
            )}
          </div>
        )}
      </FileDropzone>
    </div>
  );
};
