import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CustomInput, CustomSelector } from "~/components/atoms";

export const SearchFilters = () => {
  return (
    <div className="flex mb-2 gap-2 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <div className="w-full">
        <CustomInput
          placeholder="Buscar..."
          className="w-full"
          startAdornment={
            <MagnifyingGlassIcon className="size-5 text-gray-500" />
          }
        />
      </div>
      <div className="w-56">
        <CustomSelector
          options={[
            { id: "all", name: "Todos" },
            { id: "civil", name: "Civil" },
            { id: "laboral", name: "Laboral" },
            { id: "familiar", name: "Familiar" },
            { id: "penal", name: "Penal" },
          ]}
          selected={{ id: "all", name: "Todos" }}
          onChange={() => {}}
        />
      </div>
      <div className="w-56">
        <CustomSelector
          options={[
            { id: "Más antiguo", name: "Más antiguo" },
            { id: "Más reciente", name: "Más reciente" },
          ]}
          selected={{ id: "Más reciente", name: "Más reciente" }}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
