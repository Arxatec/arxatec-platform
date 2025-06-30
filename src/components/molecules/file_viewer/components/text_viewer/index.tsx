import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { getCategoryAttachmentName, getFileSize } from "~/utilities";
import { HeaderModal } from "../header_modal";
import { FooterModal } from "../footer_modal";
import type { FileData } from "../../types";

interface Props {
  fileData: FileData;
  canDownload?: boolean;
  onClose: () => void;
}
export const TextViewer: React.FC<Props> = ({
  fileData,
  canDownload = true,
  onClose,
}) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fileData.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
        setLoading(false);
      };
      reader.readAsText(fileData.file);
    } else if (fileData.url) {
      fetch(fileData.url)
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent("No se pudo cargar el contenido del archivo.");
          setLoading(false);
        });
    }
  }, [fileData.file, fileData.url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando archivo...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <HeaderModal label={fileData.label} onClose={onClose} />

      <div className="w-full">
        <div className="text-center border-b border-gray-200 pb-4">
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

        <div className="h-96 p-6 w-full">
          <div className="w-full h-full border rounded-lg border-slate-100 bg-slate-50">
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
        </div>
      </div>

      <FooterModal
        canDownload={canDownload}
        fileData={fileData}
        fileType="texto"
      />
    </div>
  );
};
