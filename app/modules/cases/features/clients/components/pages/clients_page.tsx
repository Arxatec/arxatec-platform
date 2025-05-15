import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";
import { CardClient } from "../molecules";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { APP_PATHS } from "~/routes/routes";
import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";

export default function ClientsPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(APP_PATHS.CASES);
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);
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
          <h2 className="text-base font-bold">Mis clientes</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
        <CardClient />
      </div>
    </div>
  );
}
