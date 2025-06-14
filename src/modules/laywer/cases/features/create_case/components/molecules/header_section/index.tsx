import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useLocation } from "wouter";
import { PrimaryButton } from "~/components/atoms";

export const HeaderSection = () => {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  return (
    <div className="grid grid-cols-[40px_1fr_auto] mb-2 gap-2">
      <button
        onClick={onBack}
        className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
      >
        <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
      </button>
      <div className="bg-white px-4 py-2 w-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
        <h2 className="text-base font-bold">Crear caso</h2>
      </div>
      <PrimaryButton className="w-full h-full">
        <DocumentPlusIcon className="size-4 mr-2 text-white" />
        Crear caso
      </PrimaryButton>
    </div>
  );
};
