export const ArticleSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex gap-4">
      <div className="w-32 h-32 bg-gray-100 rounded-md"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);
