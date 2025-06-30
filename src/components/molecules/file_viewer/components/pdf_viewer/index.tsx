import { useState, useEffect } from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getCategoryAttachmentName, getFileSize } from "~/utilities";
import { HeaderModal } from "../header_modal";
import { FooterModal } from "../footer_modal";
import type { FileData } from "../../types";

interface Props {
  fileData: FileData;
  canDownload?: boolean;
  onClose: () => void;
}

export const PDFViewer: React.FC<Props> = ({
  fileData,
  canDownload = true,
  onClose,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (fileData.file) {
      const url = URL.createObjectURL(fileData.file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (fileData.url) {
      setPdfUrl(fileData.url);
    }
  }, [fileData.file, fileData.url]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <HeaderModal label={fileData.label} onClose={onClose} />

      <div className="text-center border-b border-gray-200 pb-4 w-full">
        <h3 className="text-base font-medium text-gray-900">
          {fileData.label}
        </h3>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-1">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryAttachmentName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500">
          Tamaño: {getFileSize({ file: fileData.file })}
        </p>
      </div>

      <div className="w-full overflow-hidden">
        {pdfUrl ? (
          <div style={{ height: "500px" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50">
            <DocumentIcon className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">Cargando PDF...</p>
          </div>
        )}
      </div>

      <FooterModal
        canDownload={canDownload}
        fileData={fileData}
        fileType="PDF"
      />
    </div>
  );
};
