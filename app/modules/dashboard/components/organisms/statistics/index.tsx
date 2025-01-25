import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../atoms/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tipado de los datos
interface DataPoint {
  month: string;
  value: number;
}

const data: DataPoint[] = [
  { month: "Lima", value: 12000 },
  { month: "Lima-Centro", value: 15000 },
  { month: "Cusco", value: 9500 },
  { month: "Cusco-Urbano", value: 12000 },
  { month: "Arequipa", value: 10000 },
  { month: "Arequipa-Metropolitana", value: 13500 },
  { month: "Trujillo", value: 8500 },
  { month: "Trujillo-Centro", value: 11000 },
  { month: "Chiclayo", value: 8000 },
  { month: "Chiclayo-Metropolitana", value: 10500 },
  { month: "Piura", value: 7000 },
];

const StatisticsDashboard: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">10k</span>
            <span className="text-gray-500 text-sm"></span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                interval={1}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis hide={true} />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-xl font-semibold">
                          ${payload[0].value.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Facturación con Descuento
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                fill="url(#colorValue)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#0EA5E9" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsDashboard;
