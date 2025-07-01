export const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      {/* Statistics skeleton */}
      <div className="gap-2 h-full grid grid-rows-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg w-96 shadow-sm p-4 animate-pulse"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap mt-2">
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-gray-200 rounded-lg shadow-sm animate-pulse h-full flex flex-col">
        <div className="w-full h-full p-4 flex items-center justify-center flex-col">
          <div className="w-full h-full bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
