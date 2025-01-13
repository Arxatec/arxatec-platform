import {
  ArchiveBoxIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import {
  BookmarkIcon,
  EyeSlashIcon,
  FlagIcon,
} from "@heroicons/react/20/solid";
import { CustomDropdown } from "~/components/atoms";

export const PostMenu = () => {
  const menuItems = [
    {
      items: [
        {
          id: "save",
          label: "Guardar",
          icon: <BookmarkIcon className="w-4 h-4" />,
          onClick: () => console.log("Edit clicked"),
        },
        {
          id: "hide",
          label: "Ocultar",
          icon: <EyeSlashIcon className="w-4 h-4" />,
          onClick: () => console.log("Duplicate clicked"),
        },
        {
          id: "report",
          label: "Reportar",
          icon: <FlagIcon className="w-4 h-4" />,
          onClick: () => console.log("Duplicate clicked"),
        },
      ],
    },
  ];
  return (
    <CustomDropdown
      sections={menuItems}
      position="right"
      buttonIcon={<EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 " />}
      buttonClassName="gap-0 m-0 flex items-center justify-center bg-white rounded-full hover:bg-slate-100 transition-all size-8"
    />
  );
};
