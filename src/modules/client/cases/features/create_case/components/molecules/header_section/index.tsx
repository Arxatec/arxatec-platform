import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "~/components/atoms";
import { ROUTES } from "~/routes/routes";

interface Props {
  onCreateCase: () => void;
  isLoading: boolean;
}

export const HeaderSection = ({ onCreateCase, isLoading }: Props) => {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.Client.CasesPersonal);
  return (
    <div className="grid grid-cols-[40px_1fr_auto] mb-2 gap-2">
      <button
        onClick={isLoading ? null : onBack}
        className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
      >
        <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
      </button>
      <div className="bg-white px-4 py-2 w-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
        <h2 className="text-base font-bold">Crear caso</h2>
      </div>
      <PrimaryButton
        className="w-full h-full"
        onClick={onCreateCase}
        loader={isLoading}
        disabled={isLoading}
      >
        <DocumentPlusIcon className="size-4 mr-2 text-white" />
        Crear caso
      </PrimaryButton>
    </div>
  );
};
