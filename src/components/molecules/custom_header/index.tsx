import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  onBack: () => void;
  title: string;
}

export const CustomHeader: React.FC<Props> = ({ onBack, title }) => {
  return (
    <div className="grid grid-cols-[40px_auto] mb-2 gap-2">
      <button
        onClick={onBack}
        className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
      >
        <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
      </button>
      <div className="bg-white px-4 py-2 w-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
        <h2 className="text-base font-bold">{title}</h2>
      </div>
    </div>
  );
};
