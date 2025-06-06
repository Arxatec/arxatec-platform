import { useState } from "react";
import { FileUploadInput, FilePreview } from "../../atoms";
import { useCaseStore } from "../../../store/case.store";

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
  const { files, addFile, removeFile } = useCaseStore();
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
        addFile({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <FileUploadInput onFileChange={handleFileChange} error={error} />
      <div className="mt-4 space-y-4">
        {files.map((file) => (
          <FilePreview
            key={file.id}
            id={file.id}
            name={file.file.name}
            type={file.file.type}
            onRemove={removeFile}
          />
        ))}
      </div>
    </div>
  );
};
