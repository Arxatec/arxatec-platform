import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { DropzoneUploader } from "../../atoms";
import { FileMetadataModal, FileViewer } from "~/components/molecules";
import { FilePreviewList } from "../file_preview_list";

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

interface Props {
  onFilesChange?: (files: UploadedFile[]) => void;
}

export interface FileUploadSectionRef {
  reset: () => void;
}

export const FileUploadSection = forwardRef<FileUploadSectionRef, Props>(
  ({ onFilesChange }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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
        setSelectedFile(null);
        setIsViewerOpen(false);
        setPendingFile(null);
        setIsInfoModalOpen(false);
      },
    }));

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

    const getSelectedUser = () => {
      return selectedFile
        ? {
            ...selectedFile,
            category_id: selectedFile.category_id.toString(),
          }
        : null;
    };

    const handleFilesChange = (files: UploadedFile[]) => {
      if (files.length === 0) return;
      const file = files[0];

      setPendingFile({
        file: file.file,
        preview: file.preview,
      });

      setIsInfoModalOpen(true);
    };

    return (
      <div className="bg-white rounded-lg py-4 shadow-sm hover:shadow-md transition-all w-full h-full">
        <div className="h-full flex flex-col ">
          <div className="flex items-center gap-1 mb-1 px-4">
            <label className="text-sm font-medium text-gray-900 ">
              Adjuntar multimedia
            </label>
            <span className="text-xs text-gray-500">(opcional)</span>
          </div>
          <DropzoneUploader onFilesChange={handleFilesChange} />
          <FilePreviewList
            files={uploadedFiles}
            onRemove={handleRemoveFile}
            onView={handleViewFile}
          />
          <FileMetadataModal
            isOpen={isInfoModalOpen}
            onClose={handleCloseInfoModal}
            onSave={handleSaveFileInfo}
            fileName={pendingFile?.file.name || ""}
          />
          <FileViewer
            file={getSelectedUser()}
            isOpen={isViewerOpen}
            onClose={handleCloseViewer}
          />
        </div>
      </div>
    );
  }
);
