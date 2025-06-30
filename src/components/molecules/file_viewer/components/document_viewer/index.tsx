import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { getCategoryAttachmentName, getFileSize } from "~/utilities";
import { HeaderModal } from "../header_modal";
import { FooterModal } from "../footer_modal";
import type { FileData } from "../../types";

interface Props {
  fileData: FileData;
  canDownload?: boolean;
  onClose: () => void;
}

export const DocumentViewer: React.FC<Props> = ({
  fileData,
  canDownload = true,
  onClose,
}) => {
  const getFileTypeDisplay = (type?: string): string => {
    if (!type) return "Documento";
    if (type.includes("word")) return "Documento de Word";
    if (type.includes("excel") || type.includes("spreadsheet"))
      return "Hoja de cálculo de Excel";
    return "Documento";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <HeaderModal label={fileData.label} onClose={onClose} />

      <div className="text-center">
        <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-base font-medium text-gray-900">
          {fileData.label}
        </h3>
        {fileData.description && (
          <p className="text-sm text-gray-600 mt-2">{fileData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Categoría: {getCategoryAttachmentName(fileData.category_id)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tipo: {getFileTypeDisplay(fileData.file?.type)}
        </p>
        <p className="text-sm text-gray-500">Tamaño: {getFileSize(fileData)}</p>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 max-w-md">
        <p className="text-sm text-sky-800">
          Para ver este documento, descárgalo y ábrelo con la aplicación
          apropiada (Microsoft Word o Excel).
        </p>
      </div>

      <FooterModal
        canDownload={canDownload}
        fileData={fileData}
        fileType="documento"
      />
    </div>
  );
};
