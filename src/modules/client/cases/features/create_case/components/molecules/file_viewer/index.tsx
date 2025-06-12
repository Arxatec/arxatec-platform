import {
  FileViewerModal,
  ImageViewer,
  TextViewer,
  DocumentViewer,
  UnsupportedViewer,
  PDFViewer,
} from "../../atoms";

type UploadedFile = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface FileViewerProps {
  file: UploadedFile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FileViewer = ({ file, isOpen, onClose }: FileViewerProps) => {
  if (!file) return null;

  const getFileViewer = () => {
    const fileType = file.file.type;

    // Imágenes
    if (fileType.startsWith("image/")) {
      return <ImageViewer fileData={file} />;
    }

    // Archivos de texto
    if (
      fileType === "text/plain" ||
      fileType === "application/json" ||
      fileType === "text/markdown" ||
      fileType === "text/csv" ||
      fileType === "application/javascript" ||
      fileType === "text/javascript" ||
      fileType === "application/typescript" ||
      fileType === "text/typescript"
    ) {
      return <TextViewer fileData={file} />;
    }

    // Documentos Word y Excel
    if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <DocumentViewer fileData={file} />;
    }

    // PDFs - Ahora usando PDFViewer
    if (fileType === "application/pdf") {
      return <PDFViewer fileData={file} />;
    }

    // Archivo no soportado
    return <UnsupportedViewer fileData={file} />;
  };

  return (
    <FileViewerModal isOpen={isOpen} onClose={onClose} title={file.label}>
      {getFileViewer()}
    </FileViewerModal>
  );
};
