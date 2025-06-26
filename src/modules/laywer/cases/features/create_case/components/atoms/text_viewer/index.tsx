import { useState, useEffect } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";
import { Scrollbars } from "react-custom-scrollbars-2";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface TextViewerProps {
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

export const TextViewer = ({ fileData }: TextViewerProps) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContent(e.target?.result as string);
      setLoading(false);
    };
    reader.readAsText(fileData.file);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando archivo...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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

      <div className="h-96 border border-gray-200 rounded-lg">
        <Scrollbars
          style={{ height: "100%" }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
              }}
            />
          )}
        >
          <pre className="whitespace-pre-wrap text-sm text-gray-700  p-4 rounded">
            {content}
          </pre>
        </Scrollbars>
      </div>

      <div className="text-center">
        <PrimaryButton onClick={downloadFile}>
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Descargar
        </PrimaryButton>
      </div>
    </div>
  );
};
