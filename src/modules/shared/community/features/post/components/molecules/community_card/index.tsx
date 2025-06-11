import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: string;
  onlineCount: string;
  isPublic?: boolean;
  onJoin?: () => void;
}

export const CommunityCard = ({
  name,
  description,
  memberCount,
  onlineCount,
  isPublic = true,
  onJoin,
}: CommunityCardProps) => {
  return (
    <div className=" mt-2 p-4 text-black bg-white rounded-lg w-full h-fit shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">r/{name}</h2>
        <PrimaryButton
          onClick={onJoin}
          className="px-4 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          Unirse
        </PrimaryButton>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold text-gray-700">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>

      <div className="mt-3 flex items-center">
        {isPublic && (
          <div className="flex items-center text-xs text-gray-600">
            <GlobeAltIcon className="mr-1 h-4 w-4" />
            <span>Público</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-start gap-4">
        <div className="flex flex-col">
          <span className="text-base font-medium">{memberCount}</span>
          <span className="text-xs text-gray-600">Miembros</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-base font-medium">{onlineCount}</span>
          </div>
          <span className="text-xs text-gray-600">En línea</span>
        </div>
      </div>
    </div>
  );
};
