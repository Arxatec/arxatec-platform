import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CustomInput, CustomRange, CustomSelector } from "~/components/atoms";

const communicationPreferences = [
  {
    id: 1,
    name: "Mensajeria",
  },
  {
    id: 2,
    name: "Videollamada",
  },
  {
    id: 3,
    name: "Llamada",
  },
  {
    id: 4,
    name: "Correo electrónico",
  },
];
const urgencies = [
  {
    id: 1,
    name: "Inmediato",
  },
  {
    id: 2,
    name: "En las próximas semanas",
  },
  {
    id: 3,
    name: "Solo explorando opciones",
  },
];

export const LegalPreferencesStep = () => {
  const [communicationPreference, setCommunicationPreference] = useState(
    communicationPreferences[0]
  );
  const [urgency, setUrgency] = useState(urgencies[0]);
  const [priceRange, setPriceRange] = useState(100);
  return (
    <>
      <div>
        <label
          htmlFor={"experience"}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Rango de precio ideal
        </label>

        <div className="w-full ">
      
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">${priceRange}.00</p>
            <CustomRange
              min={0}
              max={100}
              step={1}
              defaultValue={50}
              onChange={setPriceRange}
            />
            <p className="text-gray-500 text-sm">$100.00</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Urgencia
          </label>
          <CustomSelector
            options={urgencies}
            selected={urgency}
            onChange={setUrgency}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Comunicación preferida
          </label>
          <CustomSelector
            options={communicationPreferences}
            selected={communicationPreference}
            onChange={setCommunicationPreference}
          />
        </div>
      </div>
    </>
  );
};
