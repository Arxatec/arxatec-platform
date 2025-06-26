export const CasesSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Table skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Table header skeleton */}
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Table rows skeleton */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border-b border-gray-100 p-4">
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Código de referencia */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>

              {/* Título del caso */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4"></div>
              </div>

              {/* Categoría */}
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>

              {/* Urgencia */}
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>

              {/* Fecha de creación */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
