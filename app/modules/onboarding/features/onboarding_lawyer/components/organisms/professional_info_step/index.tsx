import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CustomInput, CustomSelector } from "~/components/atoms";

const specialities = [
  {
    id: 1,
    name: "Abogado laboral",
  },
  {
    id: 2,
    name: "Abogado civil",
  },
  {
    id: 3,
    name: "Abogado penal",
  },
];

const experiences = [
  {
    id: 1,
    name: "1 año",
  },
  {
    id: 2,
    name: "2 años",
  },
  {
    id: 3,
    name: "3 años",
  },
  {
    id: 4,
    name: "4 años",
  },
  {
    id: 5,
    name: "5 años",
  },
];

export const ProfessionalInfoStep = () => {
  const [speciality, setSpeciality] = useState(specialities[0]);
  const [experience, setExperience] = useState(experiences[0]);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Especialidad
          </label>
          <CustomSelector
            options={specialities}
            selected={speciality}
            onChange={setSpeciality}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Experiencia
          </label>
          <CustomSelector
            options={experiences}
            selected={experience}
            onChange={setExperience}
          />
        </div>
      </div>
      <CustomInput
        startAdornment={
          <BuildingLibraryIcon className="size-5 text-gray-400" />
        }
        type="text"
        label={"Perfil de Linkedin"}
        placeholder={"Ej: https://www.linkedin.com/in/juan-perez/"}
        required
      />
    </>
  );
};
