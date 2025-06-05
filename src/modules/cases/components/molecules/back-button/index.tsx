import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
    >
      <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
    </button>
  );
};
