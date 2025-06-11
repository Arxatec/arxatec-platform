import { StatCard } from "../../atoms";

export const StatisticsGroup = () => {
  return (
    <div className="flex flex-col gap-2">
      <StatCard
        title="Cantidad de clientes"
        value={92}
        trend={{ value: "+55%", isPositive: true }}
      />
      <StatCard
        title="Total de casos"
        value={118}
        trend={{ value: "-10%", isPositive: false }}
      />
      <StatCard
        title="Casos públicos"
        value={1217}
        trend={{ value: "+10%", isPositive: true }}
      />
    </div>
  );
};
