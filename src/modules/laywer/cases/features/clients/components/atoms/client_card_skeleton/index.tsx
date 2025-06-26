export const ClientCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-full animate-pulse">
      <div className="flex gap-2">
        <div className="size-28 rounded-md bg-gray-200"></div>
      </div>
      <div className="divide-y divide-gray-100">
        <div className="py-2">
          {/* Nombre */}
          <div className="h-5 bg-gray-200 rounded w-24 mb-1"></div>
          {/* Descripción */}
          <div className="h-4 bg-gray-100 rounded w-32 mb-2"></div>

          {/* Botones */}
          <div className="flex gap-2 my-2">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="py-2 space-y-3">
          {/* Fecha de nacimiento */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-100 rounded w-20"></div>
          </div>

          {/* Contacto */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-100 rounded w-36"></div>
            <div className="h-3 bg-gray-100 rounded w-40"></div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-100 rounded w-44"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
