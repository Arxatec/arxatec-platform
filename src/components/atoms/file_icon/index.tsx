import {
  PhotoIcon,
  TableCellsIcon,
  CodeBracketIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";

interface FileIconProps {
  fileType: string;
}

export const FileIcon = ({ fileType }: FileIconProps) => {
  if (fileType.startsWith("image/")) {
    return <PhotoIcon className="size-5 text-gray-400" />;
  }
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    return <TableCellsIcon className="size-5 text-gray-400" />;
  }
  if (
    fileType === "application/json" ||
    fileType === "text/plain" ||
    fileType === "text/markdown"
  ) {
    return <CodeBracketIcon className="size-5 text-gray-400" />;
  }
  return <DocumentIcon className="size-5 text-gray-400" />;
};
