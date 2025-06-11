import { DocumentIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

interface FileUploadInputProps {
  onFileChange: (files: FileList | null) => void;
  error?: string;
}

export const FileUploadInput = ({
  onFileChange,
  error,
}: FileUploadInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileChange(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.json,.txt,.md,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
        onChange={handleFileInput}
      />
      <div
        className="relative mt-2 flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        role="button"
        tabIndex={0}
        aria-label="Subir archivos"
      >
        <DocumentIcon className="size-10 mx-auto text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-500">
          Subir archivos
        </span>
        <span className="text-xs text-gray-500">
          Arrastra y suelta archivos o haz clic para seleccionar (máx. 5MB)
        </span>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  );
};
