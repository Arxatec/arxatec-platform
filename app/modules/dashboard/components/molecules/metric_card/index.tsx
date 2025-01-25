import React from "react";
import { Card } from "../../atoms/card";

interface MetricCardProps {
  title: string;
  percentage: number;
  color: "orange" | "cyan" | "purple" | string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  percentage,
  color,
  description,
}) => {
  const colorMap: Record<string, string> = {
    orange: "text-orange-500",
    cyan: "text-cyan-500",
    purple: "text-purple-500",
  };

  const ringColor = colorMap[color] || "text-gray-500";

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          {/* Circular Progreso */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="36"
              className="stroke-current text-gray-200"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="36"
              className={`stroke-current ${ringColor}`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          {/* Texto de porcentaje */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl font-bold">{percentage}%</span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">Promedio de usuario en 1 hora</p>
          <p className="text-gray-400 text-xs mt-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
