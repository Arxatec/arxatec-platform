import React from "react";
import Layout from "./Layout";
import { Card } from "../atoms/Card";
import MetricCard from "../molecules/MetricCard";
import ReminderList from "../organisms/ReminderList";
import StatisticsSection from "../organisms/StatisticsSection";
import MapView from "../organisms/MapView";
import Statistics from "../organisms/Statistics";
import InvoiceTable from "../organisms/InvoiceTable";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title="Tasa de Utilización"
              percentage={80}
              color="orange"
              description="Porcentaje de tiempo utilizado en tareas legales según una aplicación web de servicios por hora."
            />
            <MetricCard
              title="Tasa de Realización"
              percentage={60}
              color="cyan"
              description="Porcentaje de tareas completadas dentro del contexto de una aplicación web de servicios legales por hora."
            />
            <MetricCard
              title="Tasa de Cobro"
              percentage={50}
              color="purple"
              description="Porcentaje de ingresos cobrados exitosamente a través de una aplicación web de servicios legales por hora."
            />
          </div>
          <div className="md:col-span-1">
            <ReminderList />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-3 p-6">
            <StatisticsSection />
          </Card>
          <Card className="md:col-span-1 p-6">
            <MapView />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <Statistics />
          </Card>
          <Card className="p-6">
            <InvoiceTable />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
