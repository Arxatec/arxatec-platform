export const CardLawyerSkeleton = () => {
  return (
    <div className="bg-white rounded-lg w-full overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="w-full h-60 bg-gray-200 animate-pulse" />
      <div className="flex items-center gap-2 my-2 px-4">
        <div className="bg-gray-200 animate-pulse rounded-md w-16 h-6" />
      </div>
      <div className="flex flex-col px-4 pb-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-4" />
        <div className="grid grid-cols-2 gap-1 mt-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 animate-pulse rounded mt-4" />
      </div>
    </div>
  );
};
