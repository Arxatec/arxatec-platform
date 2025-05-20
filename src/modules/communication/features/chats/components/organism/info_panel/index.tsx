import {
  ArrowUturnRightIcon,
  ArrowUturnUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { MediaItem, User } from "../../../types";
import {
  CalendarDaysIcon,
  DocumentIcon,
  PhotoIcon,
} from "@heroicons/react/16/solid";
import { CustomAvatar, CustomToggle, PrimaryButton } from "~/components/atoms";
import { InformationCircleIcon, ShareIcon } from "@heroicons/react/24/solid";

interface InfoPanelProps {
  chat: User | null;
  mediaItems: MediaItem[];
  handleOpenInfo: () => void;
}

export const InfoPanel = ({
  chat,
  mediaItems,
  handleOpenInfo,
}: InfoPanelProps) => {
  if (!chat) return null;

  return (
    <div className="w-80 ml-2 grid grid-rows-[auto_1fr] gap-2">
      <div className=" flex items-center justify-between shadow-sm bg-white rounded-lg px-4 py-4 w-full h-16 hover:shadow-md transition-all">
        <h2 className="text-base font-bold text-left">Información</h2>
        <button
          className="p-1 hover:bg-gray-100 rounded-full transition-all"
          onClick={handleOpenInfo}
        >
          <XMarkIcon className="size-5 text-gray-600" />
        </button>
      </div>

      <div className=" bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all h-full">
        <div className="flex items-center justify-center flex-col mt-4">
          <CustomAvatar avatar={chat.avatar} username={chat.name} size="6rem" />
          <div className="mt-2">
            <h3 className="text-gray-900 text-base font-semibold text-center">
              {chat.name}
            </h3>
            <h3 className="text-gray-500 text-sm text-center">Abogado</h3>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <PrimaryButton className="border w-full bg-white border-gray-200 rounded-lg px-4 py-2 flex items-center justify-center gap-1 hover:bg-gray-50 flex-col">
            <CalendarDaysIcon className="text-blue-600 size-5" />
            <p className="text-gray-700 text-sm font-normal">Agendar</p>
          </PrimaryButton>
          <PrimaryButton className="border w-full bg-white border-gray-200 rounded-lg px-4 py-2 flex items-center justify-center gap-1 hover:bg-gray-50 flex-col">
            <ShareIcon className="text-blue-600 size-5" />
            <p className="text-gray-700 text-sm font-normal">Compartir</p>
          </PrimaryButton>
        </div>

        <div className="mt-4 border-b border-gray-100 py-4">
          <div className="flex items-center gap-1 mb-2">
            <DocumentIcon className="size-4 text-gray-700" />
            <p className="text-xs font-bold text-gray-700 tracking-wider">
              DESCRIPCIÓN
            </p>
          </div>
          <p className="text-sm text-gray-500">{chat.description}</p>
        </div>

        <div className="border-b border-gray-100 py-4">
          <div className="flex items-center gap-1 mb-2">
            <InformationCircleIcon className="size-4 text-gray-700" />
            <p className="text-xs font-bold text-gray-700 tracking-wider">
              INFORMACIÓN
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="flex items-center gap-2 justify-between">
              <b className="text-sm font-semibold">Email:</b>
              <p className="text-sm">yerik05vh@gmail.com</p>
            </span>
            <span className="flex items-center gap-2 justify-between">
              <b className="text-sm font-semibold">Celular:</b>
              <p className="text-sm">+57 312 345 6789</p>
            </span>
          </div>
        </div>

        <div className=" border-b border-gray-100 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 mb-2">
              <PhotoIcon className="size-4 text-gray-700" />
              <p className="text-xs font-bold text-gray-700 tracking-wider">
                MEDIA (29)
              </p>
            </div>
            <button className="text-sm text-blue-600">Mirar todo</button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {mediaItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="size-20 block border border-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src="https://cdn.dribbble.com/userupload/5829947/file/original-148704a7177df8e269830b32917ccc8f.png"
                  alt="Media item"
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" flex items-center justify-between gap-2 py-4">
          <p className="text-sm text-gray-900">Notificaciones</p>
          <CustomToggle />
        </div>
      </div>
    </div>
  );
};
