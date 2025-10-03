import { Skeleton } from "@/components/ui";

export const LoadingState = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-serif mt-4 mb-8">
        Editar cliente
      </h1>
      <Skeleton className="w-full h-[600px]" />
    </div>
  );
};
