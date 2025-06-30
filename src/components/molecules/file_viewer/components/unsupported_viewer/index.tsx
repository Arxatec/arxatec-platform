import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { FooterModal } from "../footer_modal";
import { HeaderModal } from "../header_modal";
import { getCategoryAttachmentName, getFileSize } from "~/utilities";
import type { FileData } from "../../types";

interface Props {
  fileData: FileData;
  canDownload?: boolean;
  onClose: () => void;
}

export const UnsupportedViewer: React.FC<Props> = ({
  fileData,
  canDownload = true,
  onClose,
}) => (
  <div className="flex flex-col items-center space-y-4 pb-8">
    <HeaderModal label={fileData.label} onClose={onClose} />
    <div className="text-center">
      <ExclamationTriangleIcon className="mx-auto size-14 text-slate-300 mb-4" />
      <h3 className="text-base font-medium text-gray-900">{fileData.label}</h3>
      {fileData.description && (
        <p className="text-sm text-gray-600">{fileData.description}</p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        Categoría: {getCategoryAttachmentName(fileData.category_id)}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Tipo: {fileData.file?.type || "Desconocido"}
      </p>
      <p className="text-sm text-gray-500">
        Tamaño: {getFileSize({ file: fileData.file })}
      </p>
    </div>

    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-md">
      <p className="text-sm text-indigo-800">
        Este tipo de archivo no es compatible con la vista previa. Descarga el
        archivo para ver su contenido.
      </p>
    </div>

    <FooterModal
      canDownload={canDownload}
      fileData={fileData}
      fileType="archivo"
    />
  </div>
);
