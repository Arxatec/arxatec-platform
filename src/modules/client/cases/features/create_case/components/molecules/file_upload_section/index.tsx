import { useState } from "react";
import { FileUploadInput, FilePreview } from "../../atoms";

type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

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

export const FileUploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>("");

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

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-full">
      <div className="h-full flex flex-col">
        <label className="text-sm font-medium text-gray-900">
          Adjuntar multimedia
        </label>
        <FileUploadInput onFileChange={handleFileChange} error={error} />
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file) => (
              <FilePreview
                key={file.id}
                id={file.id}
                name={file.file.name}
                type={file.file.type}
                onRemove={handleRemoveFile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
