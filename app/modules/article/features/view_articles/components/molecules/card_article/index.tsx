import {
  PencilIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import { CustomAvatar, CustomDropdown } from "~/components/atoms";

export const CardArticle = () => {
  const menuItems = [
    {
      items: [
        {
          id: "view",
          label: "Ver más",
          icon: <LinkIcon className="w-4 h-4" />,
          onClick: () => console.log("Edit clicked"),
        },
        {
          id: "edit",
          label: "Editar",
          icon: <PencilIcon className="w-4 h-4" />,
          onClick: () => console.log("Duplicate clicked"),
        },
        {
          id: "delete",
          label: "Eliminar",
          icon: <TrashIcon className="w-4 h-4" />,
          onClick: () => console.log("Duplicate clicked"),
        },
      ],
    },
  ];
  return (
    <button className="bg-white flex items-center gap-4 rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all">
      <img
        src="https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg"
        alt="lawyer"
        className="w-52 h-52 object-cover"
      />
      <div className="px-4 py-4 flex items-start justify-between w-full h-full gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-50 rounded-md px-2 py-1 text-xs border border-gray-100 text-gray-700">
              Abogados
            </div>
          </div>
          <h1 className=" font-bold text-gray-900 text-base w-full text-left">
            Como denunciar a un abogado
          </h1>
          <p className="text-gray-500 text-sm w-full text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
            omnis, sint minus sunt fugiat dolor nulla aliquam quo iure magni
            voluptate recusandae nemo asperiores impedit quae voluptates quos
            non exercitationem!
          </p>
          <div className="flex items-center gap-2 mt-4">
            <CustomAvatar
              avatar="https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg"
              username="lawyer"
              size="2.5rem"
            />
            <p className="text-gray-500 text-sm flex flex-col ">
              <span className="font-semibold text-gray-900 text-sm w-full text-left">
                Juan Perez
              </span>
              <span className="text-gray-500 text-xs w-full text-left">
                Publicado el 26 de abril de 2025
              </span>
            </p>
          </div>
        </div>

        <div>
          <CustomDropdown
            sections={menuItems}
            position="right"
            buttonIcon={
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 " />
            }
            buttonClassName="gap-0 m-0 flex items-center justify-center bg-white rounded-full hover:bg-slate-100 transition-all size-8"
          />
        </div>
      </div>
    </button>
  );
};
