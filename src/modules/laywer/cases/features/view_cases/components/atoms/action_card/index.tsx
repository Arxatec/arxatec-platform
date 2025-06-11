import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  onClick: () => void;
}

export const ActionCard = ({
  title,
  icon,
  iconBgColor,
  iconColor,
  onClick,
}: ActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-80 shadow-sm hover:shadow-md transition-all rounded-md p-4 bg-white"
    >
      <div>
        <div className="flex items-start gap-2 justify-between">
          <div
            className={`flex w-fit items-center gap-2 ${iconBgColor} rounded-md p-2`}
          >
            <div className={`size-6 ${iconColor}`}>{icon}</div>
          </div>

          <ArrowUpRightIcon className="size-4 text-gray-500" />
        </div>
        <h2 className="text-base font-semibold text-gray-900 mt-2 text-left">
          {title}
        </h2>
      </div>
    </button>
  );
};
