import { CardLawyer } from "../../molecules";
import { CardLawyerSkeleton } from "../../atoms";
import type { Lawyer } from "../../../types";

interface LawyersGridProps {
  isLoading: boolean;
  lawyers?: Lawyer[];
}

export const LawyersGrid = ({ isLoading, lawyers = [] }: LawyersGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-2 w-full mt-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <CardLawyerSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-full mt-2">
      {lawyers.map((lawyer) => (
        <CardLawyer key={lawyer.id} {...lawyer} />
      ))}
    </div>
  );
};
