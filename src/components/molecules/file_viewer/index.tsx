import { CustomModal } from "~/components/molecules";
import {
  ImageViewer,
  TextViewer,
  DocumentViewer,
  UnsupportedViewer,
  PDFViewer,
} from "./components";

type UploadedFile = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file?: File;
  preview?: string;
  url?: string;
};

interface FileViewerProps {
  file: UploadedFile | null;
  isOpen: boolean;
  onClose: () => void;
  canDownload?: boolean;
}

// Helper function to get file type from extension
const getFileType = (extension: string): string => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const pdfExtensions = ["pdf"];
  const textExtensions = ["txt", "json", "csv", "md"];
  const documentExtensions = ["doc", "docx", "xls", "xlsx"];

  if (imageExtensions.includes(extension)) return "image";
  if (pdfExtensions.includes(extension)) return "pdf";
  if (textExtensions.includes(extension)) return "text";
  if (documentExtensions.includes(extension)) return "document";
  return "unknown";
};

export const FileViewer = ({
  file,
  isOpen,
  onClose,
  canDownload = true,
}: FileViewerProps) => {
  if (!file) return null;

  const getFileViewer = ({ onClose }: { onClose: () => void }) => {
    const fileType = getFileType(file.file?.type || "");

    // Imágenes
    if (fileType.startsWith("image/")) {
      return (
        <ImageViewer
          fileData={file}
          onClose={onClose}
          canDownload={canDownload}
        />
      );
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
      return (
        <TextViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
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
      return (
        <DocumentViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
    }

    // PDFs - Ahora usando PDFViewer
    if (fileType === "application/pdf") {
      return (
        <PDFViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
    }

    // Archivo no soportado
    return (
      <UnsupportedViewer
        fileData={file}
        canDownload={canDownload}
        onClose={onClose}
      />
    );
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      {({ onClose }) => getFileViewer({ onClose })}
    </CustomModal>
  );
};
