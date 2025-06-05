import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { PrimaryButton, CustomImage } from "~/components/atoms";
import type { Lawyer } from "../../../types";

export const CardLawyer = ({
  firstName,
  lastName,
  profilePicture,
  biography,
  experience,
  specialty,
  location,
  workSchedules,
}: Lawyer) => {
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="bg-white rounded-lg w-full overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      <CustomImage
        src={profilePicture}
        alt={fullName}
        className="w-full h-60 object-cover"
      />
      <div className="flex items-center gap-2 my-2 px-4">
        <div className="bg-amber-50 flex items-center gap-1 rounded-md px-2 py-1 text-xs border border-amber-100 text-amber-500 font-semibold">
          <StarIcon className="size-3.5 text-amber-500" />
          {workSchedules.length} horarios disponibles
        </div>
      </div>
      <div className="flex flex-col px-4 pb-4">
        <h2 className="text-base font-bold text-gray-900">{fullName}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{biography}</p>
        <div className="grid grid-cols-2 gap-1 mt-2">
          <span className="text-sm text-gray-700">
            <b className="text-gray-700 font-medium flex items-center gap-1">
              <AcademicCapIcon className="size-4" /> Experiencia:
            </b>{" "}
            <p className="text-gray-500 text-sm">{experience} años</p>
          </span>
          <span className="text-sm text-gray-700">
            <b className="text-gray-700 font-medium flex items-center gap-1">
              <BuildingOfficeIcon className="size-4" /> Especialidad:
            </b>{" "}
            <p className="text-gray-500 text-sm truncate w-full">{specialty}</p>
          </span>
          <span className="text-sm text-gray-700">
            <b className="text-gray-700 font-medium flex items-center gap-1">
              <MapPinIcon className="size-4" /> Ubicación:
            </b>{" "}
            <p className="text-gray-500 text-sm truncate w-full">
              {location.fullAddress}
            </p>
          </span>
          <span className="text-sm text-gray-700">
            <b className="text-gray-700 font-medium flex items-center gap-1">
              <BriefcaseIcon className="size-4" /> Horarios:
            </b>{" "}
            <p className="text-gray-500 text-sm truncate w-full">
              {workSchedules.length} disponibles
            </p>
          </span>
        </div>
        <PrimaryButton className="mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:outline-gray-700">
          Ver más
        </PrimaryButton>
      </div>
    </div>
  );
};
