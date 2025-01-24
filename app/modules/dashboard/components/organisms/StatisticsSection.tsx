import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../atoms/Card";

interface DataPoint {
  month: string;
  billable: number;
}

const mainData: DataPoint[] = [
  { month: "Ene", billable: 20000 },
  { month: "Feb", billable: 45000 },
  { month: "Mar", billable: 48000 },
  { month: "Abr", billable: 75000 },
  { month: "May", billable: 42000 },
  { month: "Jun", billable: 82000 },
  { month: "Jul", billable: 35000 },
  { month: "Actual", billable: 65000 },
];

const ResumenFirma: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Resumen</h3>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm">Facturable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-sm">No Facturable</span>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Gráfico principal */}
        <div className="h-[300px] w-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mainData}
              margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
            >
              <defs>
                <linearGradient
                  id="billableGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                interval={0}
                tickMargin={10}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                tickFormatter={(value: number) => `${value / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                tickMargin={10}
                domain={[0, "auto"]}
              />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                labelStyle={{ color: "#666" }}
              />
              <Area
                type="monotone"
                dataKey="billable"
                stroke="#8B5CF6"
                fill="url(#billableGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Tarjetas estadísticas */}
        <div className="w-1/4 flex flex-col gap-4 pl-4">
          {/* Tarjeta positiva */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-semibold text-violet-600">
                    13.6%
                  </span>
                  <span className="text-violet-600">+</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Hora actual{" "}
                </span>
              </div>
              <svg
                className="w-24 h-12"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 40 C20 40, 25 10, 45 25 C65 40, 75 20, 100 15"
                  fill="none"
                  stroke="rgb(124 58 237)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>

          {/* Tarjeta negativa */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-semibold text-blue-500">
                    05.6%
                  </span>
                  <span className="text-blue-500">-</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Hora actual{" "}
                </span>
              </div>
              <svg
                className="w-24 h-12"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 C25 15, 35 35, 55 20 C75 5, 85 25, 100 30"
                  fill="none"
                  stroke="rgb(59 130 246)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumenFirma;
