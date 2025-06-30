import { getCategoryAttachmentName, getFileSize } from "~/utilities";
import { HeaderModal } from "../header_modal";
import { FooterModal } from "../footer_modal";
import { CustomImage } from "~/components/atoms";

import type { FileData } from "../../types";

interface Props {
  fileData: FileData;
  onClose: () => void;
  canDownload?: boolean;
}

export const ImageViewer: React.FC<Props> = ({
  fileData,
  onClose,
  canDownload = true,
}) => {
  const getImageSrc = (): string => {
    if (fileData.preview) return fileData.preview;
    if (fileData.url) return fileData.url;
    return "";
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <HeaderModal label={fileData.label} onClose={onClose} />
      <div className=" w-full">
        <div className="w-full border-b border-gray-200 pb-4">
          <div className="text-center">
            <p className="text-base font-medium text-gray-900">
              {fileData.label}
            </p>
            {fileData.description && (
              <p className="text-sm text-gray-600 mt-1">
                {fileData.description}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Categoría: {getCategoryAttachmentName(fileData.category_id)}
            </p>
            <p className="text-sm text-gray-500">
              Tamaño: {getFileSize(fileData)}
            </p>
          </div>
        </div>
        <div className="w-full p-6">
          <div className="w-full max-h-96 overflow-hidden rounded-lg border border-gray-200 relative ">
            <CustomImage
              src={getImageSrc()}
              alt={fileData.label}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="w-full h-full absolute left-0 backdrop-blur-2xl bg-black/10 z-10 top-0 rounded-lg"></div>
            <img
              src={getImageSrc()}
              alt={fileData.label}
              className=" object-contain absolute z-20 left-0 right-0 mx-auto top-0 h-96"
            />
          </div>
        </div>
      </div>
      <FooterModal
        canDownload={canDownload}
        fileData={fileData}
        fileType="imagen"
      />
    </div>
  );
};
