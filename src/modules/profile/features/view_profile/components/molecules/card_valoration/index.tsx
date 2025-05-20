import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export const CardValoration: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-yellow-100 border p-4 rounded-lg">
      <h3 className="text-sm font-bold text-yellow-700 text-center">
        Valoración de clientes
      </h3>
      <h2 className="text-2xl my-2 font-bold text-yellow-500 text-center">
        4.0
      </h2>
      <div className="flex items-center gap-1 justify-center">
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIconOutline className="size-4 text-yellow-500 text-center" />
      </div>
      <p className="text-xs text-yellow-700 font-medium text-center mt-2">
        Basado en 100 opiniones
      </p>
    </div>
  );
};
