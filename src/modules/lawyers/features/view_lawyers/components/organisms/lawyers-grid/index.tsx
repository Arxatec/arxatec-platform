import { CardLawyer } from "../../molecules";
import { CardLawyerSkeleton } from "../../atoms";
import type { Lawyer } from "../../../types";

interface Props {
  isLoading: boolean;
  lawyers: Lawyer[];
}

export const LawyersGrid = ({ isLoading, lawyers }: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardLawyerSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!lawyers.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-xl font-bold text-gray-900">
          No se encontraron abogados
        </h2>
        <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {lawyers.map((lawyer) => (
        <CardLawyer key={lawyer.userId} {...lawyer} />
      ))}
    </div>
  );
};
