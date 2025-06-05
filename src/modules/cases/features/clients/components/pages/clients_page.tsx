import { useLocation } from "wouter";
import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { HeaderSection } from "../molecules";
import { ClientsGrid } from "../organism";

export default function ClientsPage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <HeaderSection title="Mis clientes" onBack={onBack} />
      <ClientsGrid />
    </div>
  );
}
