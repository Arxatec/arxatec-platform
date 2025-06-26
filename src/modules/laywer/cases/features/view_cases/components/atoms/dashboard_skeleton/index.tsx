export const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      {/* Statistics skeleton */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white rounded-lg w-96 shadow-sm p-4 animate-pulse"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap mt-2">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white rounded-lg shadow-sm pb-4 animate-pulse">
        <div className="w-full h-[300px] px-4 flex items-center justify-center">
          <div className="w-full h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
