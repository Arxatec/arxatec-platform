import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms/primary_button";
import { downloadFile } from "~/utilities";

type FileData = {
  id: string;
  category_id: string;
  label: string;
  description: string;
  file?: File;
  preview?: string;
  url?: string;
};

interface Props {
  canDownload: boolean;
  fileData: FileData;
  fileType: string;
}
export const FooterModal: React.FC<Props> = ({
  canDownload,
  fileData,
  fileType,
}) => (
  <>
    {canDownload && (
      <PrimaryButton onClick={() => downloadFile(fileData)}>
        <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
        Descargar {fileType}
      </PrimaryButton>
    )}
  </>
);
