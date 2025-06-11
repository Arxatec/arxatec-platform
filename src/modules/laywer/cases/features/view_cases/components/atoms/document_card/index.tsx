import { DocumentIcon } from "@heroicons/react/24/solid";

interface DocumentCardProps {
  title: string;
  lastUpdate: string;
  onClick: () => void;
}

export const DocumentCard = ({
  title,
  lastUpdate,
  onClick,
}: DocumentCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2"
    >
      <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
        <DocumentIcon className="size-5 text-blue-600" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-900 text-left">{title}</h2>
        <p className="text-xs text-gray-500">
          Última actualización: {lastUpdate}
        </p>
      </div>
    </button>
  );
};
