import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export const CardTestimonial: React.FC = () => {
  return (
    <div className="flex   gap-2 bg-white p-3 rounded-lg flex-col">
      <div className="flex items-center gap-1">
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIcon className="size-4 text-yellow-500 text-center" />
        <StarIconOutline className="size-4 text-yellow-500 text-center" />
      </div>
      <p className="text-sm text-gray-500">
        <span className="font-serif">“</span>Trabajar con Rafael fue una
        experiencia excepcional. Su profesionalismo y dedicación superaron
        nuestras expectativas. Recomendamos ampliamente su servicio.{" "}
        <span className="font-serif">”</span>
      </p>
      <b className="text-sm text-gray-700 font-bold">Anonimo</b>
      <span className="flex items-center justify-end gap-2"></span>
    </div>
  );
};
