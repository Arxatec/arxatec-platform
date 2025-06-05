interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg w-96 shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-medium text-sm text-gray-600">{title}</h2>
      </div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h1 className="text-4xl font-extrabold mt-2 text-gray-900">{value}</h1>
        {trend && (
          <p
            className={`text-xs font-semibold ${
              trend.isPositive
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
            } rounded-md px-2 py-1 flex items-center gap-2`}
          >
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
};
