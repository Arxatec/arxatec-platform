import {
  GlobeAltIcon,
  UserIcon,
  FolderIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { ActionCard } from "../../atoms";
import { ROUTES } from "~/routes/routes";

export const ActionCardsGroup = () => {
  const navigate = useNavigate();

  const navigateToExplorerCases = () => navigate(ROUTES.Lawyer.CasesExplorer);
  const navigateToMyCases = () => navigate(ROUTES.Lawyer.CasesPersonal);
  const navigateToClients = () => navigate(ROUTES.Lawyer.CasesClients);
  const navigateToCreateCase = () => navigate(ROUTES.Lawyer.CasesCreate);

  return (
    <div className="gap-2 grid grid-cols-1 md:grid-cols-2 ">
      <ActionCard
        title="Explorar casos"
        icon={<GlobeAltIcon />}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
        onClick={navigateToExplorerCases}
      />
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
