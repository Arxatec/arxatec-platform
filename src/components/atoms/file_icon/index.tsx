import {
  PhotoIcon,
  TableCellsIcon,
  CodeBracketIcon,
  DocumentIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

interface Props {
  fileType: string;
}

export const FileIcon: React.FC<Props> = ({ fileType }) => {
  const type = fileType.toLowerCase();

  // Imágenes
  if (
    type.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(type)
  ) {
    return <PhotoIcon className="size-5 text-gray-400" />;
  }

  // Hojas de cálculo
  if (
    type.includes("excel") ||
    type.includes("spreadsheet") ||
    ["xls", "xlsx", "csv"].includes(type)
  ) {
    return <TableCellsIcon className="size-5 text-gray-400" />;
  }

  // Archivos de código y texto
  if (
    type === "application/json" ||
    type === "text/plain" ||
    type === "text/markdown" ||
    type.includes("javascript") ||
    type.includes("typescript") ||
    [
      "json",
      "txt",
      "md",
      "js",
      "ts",
      "jsx",
      "tsx",
      "py",
      "java",
      "cpp",
      "c",
      "cs",
      "rb",
      "php",
    ].includes(type)
  ) {
    return <CodeBracketIcon className="size-5 text-gray-400" />;
  }

  // PDFs y documentos de texto
  if (
    type === "application/pdf" ||
    type.includes("word") ||
    type.includes("document") ||
    ["pdf", "doc", "docx", "rtf", "odt"].includes(type)
  ) {
    return <DocumentTextIcon className="size-5 text-gray-400" />;
  }

  // Tipo por defecto
  return <DocumentIcon className="size-5 text-gray-400" />;
};
