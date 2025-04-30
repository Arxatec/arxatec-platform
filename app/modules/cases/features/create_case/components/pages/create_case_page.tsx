import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  DocumentPlusIcon,
  DocumentIcon,
  PhotoIcon,
  TableCellsIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  CustomInput,
  CustomSelector,
  CustomTextArea,
  PrimaryButton,
} from "~/components/atoms";
import { APP_PATHS } from "~/routes/routes";
import { SelectUser } from "../molecules";

type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return <PhotoIcon className="size-5 text-gray-400" />;
  }
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    return <TableCellsIcon className="size-5 text-gray-400" />;
  }
  if (
    fileType === "application/json" ||
    fileType === "text/plain" ||
    fileType === "text/markdown"
  ) {
    return <CodeBracketIcon className="size-5 text-gray-400" />;
  }
  return <DocumentIcon className="size-5 text-gray-400" />;
};

const removeFileExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, "");
};

export default function CreateCasePage() {
  const navigate = useNavigate();
  const onBack = () => navigate(APP_PATHS.CASES);
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
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

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    setError("");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError(
          "Solo se permiten archivos PDF, DOC, Excel, JSON, TXT, Markdown, PNG, JPEG o WebP"
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("Los archivos no pueden superar los 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <SelectUser open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          onClick={onBack}
          className="flex items-center bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
        >
          <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
        </button>
        <div className="bg-white p-4 w-full  rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
          <h2 className="text-base font-bold">Crear caso</h2>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full">
              <CustomInput
                placeholder="Ej. Reclamación de daños por incumplimiento contractual"
                label="Título del caso"
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <CustomSelector
              label="Categoría"
              options={[
                {
                  name: "Derecho Civil",
                  id: 1,
                },
                {
                  name: "Derecho Laboral",
                  id: 2,
                },
              ]}
              selected={{
                name: "Derecho Civil",
                id: 1,
              }}
              onChange={() => {}}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-900">
              Seleccionar cliente
            </label>
            <button
              onClick={() => setOpen(true)}
              className="text-left text-sm text-gray-400 block border border-gray-300 w-full rounded-md px-4 py-1.5 mt-2 "
            >
              Seleccionar...
            </button>
          </div>
          <div className="mt-4">
            <CustomTextArea
              placeholder="Ej. Escribe aquí la descripción del caso"
              label="Descripción del caso"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all max-w-md w-full">
          <div className="h-full flex flex-col">
            <label className="text-sm font-medium text-gray-900">
              Adjuntar multimedia
            </label>
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
                Arrastra y suelta archivos o haz clic para seleccionar (máx.
                5MB)
              </span>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.file.type)}
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">
                        {removeFileExtension(file.file.name)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-all"
                      aria-label="Eliminar archivo"
                    >
                      <XMarkIcon className="size-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <PrimaryButton className="w-fit">
          <DocumentPlusIcon className="size-4 mr-2 text-white" />
          Crear caso
        </PrimaryButton>
      </div>
    </div>
  );
}
