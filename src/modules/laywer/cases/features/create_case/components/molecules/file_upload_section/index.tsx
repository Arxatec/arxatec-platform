import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { FileUploadInput, FilePreview } from "../../atoms";
import { FileInfoModal } from "../../atoms/file_info_modal";
import { FileViewer } from "../file_viewer";
import Scrollbars from "react-custom-scrollbars-2";

type UploadedFile = {
  id: string;
  category_id: number;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

type PendingFile = {
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

interface Props {
  onFilesChange?: (files: UploadedFile[]) => void;
}

export interface FileUploadSectionRef {
  reset: () => void;
}

export const FileUploadSection = forwardRef<FileUploadSectionRef, Props>(
  ({ onFilesChange }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [error, setError] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [pendingFile, setPendingFile] = useState<PendingFile | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // Notificar al componente padre cuando cambien los archivos
    useEffect(() => {
      if (onFilesChange) {
        onFilesChange(uploadedFiles);
      }
    }, [uploadedFiles, onFilesChange]);

    // Exponer la función de reset al componente padre
    useImperativeHandle(ref, () => ({
      reset: () => {
        setUploadedFiles([]);
        setError("");
        setSelectedFile(null);
        setIsViewerOpen(false);
        setPendingFile(null);
        setIsInfoModalOpen(false);
      },
    }));

    const handleFileChange = (files: FileList | null) => {
      if (!files) return;

      setError("");

      // Procesar solo el primer archivo
      const file = files[0];

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
        setPendingFile({
          file,
          preview: reader.result as string,
        });
        setIsInfoModalOpen(true);
      };
      reader.readAsDataURL(file);
    };

    const handleSaveFileInfo = (fileInfo: {
      label: string;
      description: string;
      category_id: number;
    }) => {
      if (!pendingFile) return;

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        category_id: fileInfo.category_id,
        label: fileInfo.label,
        description: fileInfo.description,
        file: pendingFile.file,
        preview: pendingFile.preview,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setPendingFile(null);
    };

    const handleCloseInfoModal = () => {
      setIsInfoModalOpen(false);
      setPendingFile(null);
    };

    const handleRemoveFile = (id: string) => {
      setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleViewFile = (file: UploadedFile) => {
      setSelectedFile(file);
      setIsViewerOpen(true);
    };

    const handleCloseViewer = () => {
      setIsViewerOpen(false);
      setSelectedFile(null);
    };

    return (
      <div className="bg-white rounded-lg py-4 shadow-sm hover:shadow-md transition-all w-full h-full">
        <div className="h-full flex flex-col">
          <label className="text-sm font-medium text-gray-900 mb-2 px-4">
            Adjuntar multimedia
          </label>
          <div className="px-4 h-full">
            <FileUploadInput onFileChange={handleFileChange} error={error} />
          </div>
          <div
            className={`mt-2  ${
              uploadedFiles.length > 0 ? "h-[100px]" : "h-0"
            }`}
          >
            {uploadedFiles.length > 0 && (
              <Scrollbars
                autoHide
                universal={true}
                style={{ width: "100%", height: "100%" }}
                renderView={({ style, ...props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      overflowY: "hidden",
                      marginBottom: "-17px", // Compensar el espacio del scrollbar horizontal
                      whiteSpace: "nowrap",
                    }}
                  />
                )}
              >
                <div className="flex  gap-2 h-full items-center px-4">
                  {uploadedFiles.map((file) => (
                    <FilePreview
                      key={file.id}
                      id={file.id}
                      name={file.label}
                      type={file.file.type}
                      onRemove={handleRemoveFile}
                      onView={() => handleViewFile(file)}
                    />
                  ))}
                </div>
              </Scrollbars>
            )}
          </div>

          <FileInfoModal
            isOpen={isInfoModalOpen}
            onClose={handleCloseInfoModal}
            onSave={handleSaveFileInfo}
            fileName={pendingFile?.file.name || ""}
          />

          <FileViewer
            file={
              selectedFile
                ? {
                    ...selectedFile,
                    category_id: selectedFile.category_id.toString(),
                  }
                : null
            }
            isOpen={isViewerOpen}
            onClose={handleCloseViewer}
          />
        </div>
      </div>
    );
  }
);

FileUploadSection.displayName = "FileUploadSection";
