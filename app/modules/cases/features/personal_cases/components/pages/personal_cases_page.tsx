import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { APP_PATHS } from "~/routes/routes";

export default function MyCasesPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(APP_PATHS.CASES);
  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          onClick={onBack}
          className="flex items-center bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
        >
          <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
        </button>
        <div className="bg-white p-4 w-full  rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
          <h2 className="text-base font-bold">Mis casos</h2>
        </div>
      </div>
    </div>
  );
}
