import { CustomModal } from "~/components/molecules";
import { getFileExtensionFromUrl } from "~/utilities";
import type { FileData } from "./types";
import {
  ImageViewer,
  TextViewer,
  DocumentViewer,
  UnsupportedViewer,
  PDFViewer,
} from "./components";

interface Props {
  file: FileData | null;
  isOpen: boolean;
  onClose: () => void;
  canDownload?: boolean;
}

export const FileViewer: React.FC<Props> = ({
  file,
  isOpen,
  onClose,
  canDownload = true,
}) => {
  if (!file) return null;

  const getFileViewer = ({ onClose }: { onClose: () => void }) => {
    let fileType: string;

    if (file.file) {
      fileType = file.file.type;
    } else if (file.url) {
      const extension = getFileExtensionFromUrl(file.url);
      fileType = extension;
    } else {
      fileType = "unknown";
    }

    fileType = fileType.toLowerCase();

    if (
      fileType.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(fileType)
    ) {
      return (
        <ImageViewer
          fileData={file}
          onClose={onClose}
          canDownload={canDownload}
        />
      );
    }

    const textTypes = [
      "text/plain",
      "application/json",
      "text/markdown",
      "text/csv",
      "application/javascript",
      "text/javascript",
      "application/typescript",
      "text/typescript",
    ];
    const textExtensions = [
      "txt",
      "json",
      "csv",
      "md",
      "js",
      "ts",
      "tsx",
      "jsx",
    ];

    if (textTypes.includes(fileType) || textExtensions.includes(fileType)) {
      return (
        <TextViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
    }

    const docTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const docExtensions = ["doc", "docx", "xls", "xlsx"];

    if (docTypes.includes(fileType) || docExtensions.includes(fileType)) {
      return (
        <DocumentViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
    }

    if (fileType === "application/pdf" || fileType === "pdf") {
      return (
        <PDFViewer
          fileData={file}
          canDownload={canDownload}
          onClose={onClose}
        />
      );
    }

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
