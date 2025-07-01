export const ClientCardSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-full animate-pulse">
      <div className="flex gap-2">
        <div className="size-28 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
      <div className="divide-y divide-gray-300 animate-pulse">
        <div className="py-2">
          {/* Nombre */}
          <div className="h-5 bg-gray-300 rounded w-24 mb-1 animate-pulse"></div>
          {/* Descripción */}
          <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>

          {/* Botones */}
          <div className="flex gap-2 my-2">
            <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        <div className="py-2 space-y-3">
          {/* Fecha de nacimiento */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>

          {/* Contacto */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-36 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-40 animate-pulse"></div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-44 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
