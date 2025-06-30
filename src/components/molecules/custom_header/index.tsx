import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  onBack?: () => void;
  title: string;
  action?: React.ReactNode;
}

export const CustomHeader: React.FC<Props> = ({ onBack, title, action }) => (
  <div
    className={`grid mb-2 gap-2 ${
      onBack
        ? action
          ? "grid-cols-[40px_1fr_auto]"
          : "grid-cols-[40px_auto]"
        : action
        ? "grid-cols-[auto_170px]"
        : "grid-cols-[auto]"
    }`}
  >
    {onBack && (
      <button
        onClick={onBack}
        className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
      >
        <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
      </button>
    )}
    <div className="bg-white px-4 py-2 w-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
      <h2 className="text-base font-bold">{title}</h2>
    </div>
    {action && action}
  </div>
);
