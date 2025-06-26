import { ClientCardSkeleton } from "../client_card_skeleton";

export const ClientsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, index) => (
        <ClientCardSkeleton key={index} />
      ))}
    </div>
  );
};
