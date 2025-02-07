import {
  VideoCameraIcon,
  PhoneIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { MediaItem, User } from "../../../types";
import { DocumentIcon } from "@heroicons/react/16/solid";

interface InfoPanelProps {
  chat: User | null;
  mediaItems: MediaItem[];
}

export const InfoPanel = ({ chat, mediaItems }: InfoPanelProps) => {
  if (!chat) return null;

  return (
    <div className="w-80 border-l border-gray-200 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-left">{chat.name}</h2>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
          <XMarkIcon className="size-5 text-gray-600" />
        </button>
      </div>

      <div>
        <div className="flex items-center gap-1 mb-2">
          <DocumentIcon className="size-4 text-gray-700" />
          <p className="text-xs font-bold text-gray-700 tracking-wider">
            DESCRIPCIÓN
          </p>
        </div>
        <p className="text-sm">{chat.description}</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
          <VideoCameraIcon className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
          <PhoneIcon className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
          <InformationCircleIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm text-gray-500">MEDIA (29)</h3>
          <button className="text-sm text-blue-600">Show All</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {mediaItems.slice(0, 6).map((item) => (
            <div key={item.id} className="aspect-square">
              <img
                src={item.url || "/placeholder.svg"}
                alt="Media item"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
