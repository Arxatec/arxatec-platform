import { Stats } from "../../molecules";
import {
  GlobeAltIcon,
  UsersIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

export const StatsGroup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <Stats
        title="Total de ganancias"
        value="$9075.50"
        description="+15% a comparación del anterior mes"
        icon={<CreditCardIcon className="w-5 h-5 text-blue-600" />}
        bgColor="bg-white"
        iconBgColor="bg-blue-100"
        iconTextColor="text-blue-600"
      />
      <Stats
        title="Tus clientes"
        value="503"
        description="16 nuevos clientes"
        icon={<UsersIcon className="w-5 h-5 text-sky-500" />}
        bgColor="bg-white"
        iconBgColor="bg-sky-500 bg-opacity-20"
        iconTextColor="text-sky-500"
      />
      <Stats
        title="Casos cerrados"
        value="498"
        description="10 casos resueltos recientemente"
        icon={
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-indigo-500" />
        }
        bgColor="bg-white"
        iconBgColor="bg-indigo-100"
        iconTextColor="text-indigo-500"
      />
      <Stats
        title="Vistas a tu perfil"
        value="180"
        description="50% de usuarios volvieron a visitar"
        icon={<GlobeAltIcon className="w-5 h-5 text-violet-500" />}
        bgColor="bg-white"
        iconBgColor="bg-violet-100"
        iconTextColor="text-violet-500"
      />
    </div>
  );
};
