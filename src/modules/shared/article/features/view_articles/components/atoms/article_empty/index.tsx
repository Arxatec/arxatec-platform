import { InformationCircleIcon } from "@heroicons/react/24/solid";
import type { Article } from "../../../models";

export const ArticleEmpty = ({
  isLoading,
  error,
  sortedArticles,
}: {
  isLoading: boolean;
  error: boolean;
  sortedArticles: Article[];
}) => {
  return (
    !isLoading &&
    !error &&
    sortedArticles.length === 0 && (
      <div className="bg-white rounded-md p-4 text-center w-full px-4 py-12">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <InformationCircleIcon className="size-9 text-gray-400" />
          <p className="text-gray-600 font-medium text-sm mt-2">
            No se encontraron artículos
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Puedes crear nuevos articulos desde el botoón de crear articulo que
            tienes en esta página.
          </p>
        </div>
      </div>
    )
  );
};
