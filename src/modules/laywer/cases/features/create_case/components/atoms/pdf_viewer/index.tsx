import { useState, useEffect } from "react";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface PDFViewerProps {
  fileData: FileData;
}

const getCategoryName = (categoryId: string): string => {
  const categories: Record<string, string> = {
    legal: "Legal",
    medical: "Médico",
    financial: "Financiero",
    personal: "Personal",
    other: "Otro",
  };
  return categories[categoryId] || "Sin categoría";
};

export const PDFViewer = ({ fileData }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(fileData.file);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [fileData.file]);

  const downloadFile = () => {
    const url = URL.createObjectURL(fileData.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileData.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="">
      <div className="text-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">{fileData.label}</h3>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-1">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500">
          Tamaño: {formatFileSize(fileData.file.size)}
        </p>
      </div>

      <div className="overflow-hidden">
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

      <div className=" w-full justify-center flex mt-4">
        <PrimaryButton onClick={downloadFile}>
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Descargar PDF
        </PrimaryButton>
      </div>
    </div>
  );
};
