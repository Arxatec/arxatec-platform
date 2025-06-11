import { PlusIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";

export const Header = ({
  navigateToCreateArticle,
}: {
  navigateToCreateArticle: () => void;
}) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-900">Todos los articulos</h2>
    <PrimaryButton
      className="text-sm flex items-center gap-2"
      onClick={navigateToCreateArticle}
    >
      <PlusIcon className="size-4 text-white" strokeWidth={2} />
      Nuevo articulo
    </PrimaryButton>
  </div>
);
