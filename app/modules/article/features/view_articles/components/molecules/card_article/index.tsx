import {
  PencilIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import { CustomAvatar, CustomDropdown } from "~/components/atoms";
import { type FC } from "react";
import type { Article } from "../../../services";

interface CardArticleProps {
  article: Article;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const CardArticle: FC<CardArticleProps> = ({
  article,
  onView,
  onEdit,
  onDelete,
}) => {
  const menuItems = [
    {
      items: [
        {
          id: "view",
          label: "Ver más",
          icon: <LinkIcon className="w-4 h-4" />,
          onClick: () => onView?.(article.id),
        },
        {
          id: "edit",
          label: "Editar",
          icon: <PencilIcon className="w-4 h-4" />,
          onClick: () => onEdit?.(article.id),
        },
        {
          id: "delete",
          label: "Eliminar",
          icon: <TrashIcon className="w-4 h-4" />,
          onClick: () => onDelete?.(article.id),
        },
      ],
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <button
      className="bg-white flex items-center gap-4 rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
      aria-label={`Artículo: ${article.title}`}
    >
      <img
        src={article.banner}
        alt={article.title}
        className="w-52 h-52 object-cover"
      />
      <div className="px-4 py-4 flex items-start justify-between w-full h-full gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-50 rounded-md px-2 py-1 text-xs border border-gray-100 text-gray-700 capitalize">
              {article.articleCategory.name}
            </div>
            <div className="text-xs text-gray-500">
              {article.reading_time} min de lectura
            </div>
          </div>
          <h1 className="font-bold text-gray-900 text-base w-full text-left">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm w-full text-left line-clamp-2">
            {article.resume}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <CustomAvatar
              avatar={article.userDetails.user.first_name}
              username={`${article.userDetails.user.first_name} ${article.userDetails.user.last_name}`}
              size="2.5rem"
            />
            <p className="text-gray-500 text-sm flex flex-col">
              <span className="font-semibold text-gray-900 text-sm w-full text-left">
                {`${article.userDetails.user.first_name} ${article.userDetails.user.last_name}`}
              </span>
              <span className="text-gray-500 text-xs w-full text-left">
                Publicado el {formatDate(article.publication_timestamp)}
              </span>
            </p>
          </div>
        </div>

        <div>
          <CustomDropdown
            sections={menuItems}
            position="right"
            buttonIcon={
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
            }
            buttonClassName="gap-0 m-0 flex items-center justify-center bg-white rounded-full hover:bg-slate-100 transition-all size-8"
          />
        </div>
      </div>
    </button>
  );
};
