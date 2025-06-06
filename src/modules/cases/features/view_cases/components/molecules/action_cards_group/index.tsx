import {
  GlobeAltIcon,
  UserIcon,
  FolderIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "wouter";
import { ActionCard } from "../../atoms";

export const ActionCardsGroup = () => {
  const [, setLocation] = useLocation();

  const navigateToExplorerCases = () => setLocation("/explorador");
  const navigateToMyCases = () => setLocation("/personal");
  const navigateToClients = () => setLocation("/clientes");
  const navigateToCreateCase = () => setLocation("/crear");

  return (
    <div className="flex gap-2">
      <ActionCard
        title="Mis clientes"
        icon={<UserIcon />}
        iconBgColor="bg-indigo-50"
        iconColor="text-indigo-600"
        onClick={navigateToClients}
      />
      <ActionCard
        title="Mis casos"
        icon={<FolderIcon />}
        iconBgColor="bg-sky-50"
        iconColor="text-sky-500"
        onClick={navigateToMyCases}
      />
      <ActionCard
        title="Crear caso"
        icon={<FolderPlusIcon />}
        iconBgColor="bg-cyan-50"
        iconColor="text-cyan-500"
        onClick={navigateToCreateCase}
      />
    </div>
  );
};
