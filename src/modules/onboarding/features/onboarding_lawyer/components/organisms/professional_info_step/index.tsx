import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import { CustomInput, CustomSelector } from "~/components/atoms";
import {
  experiencesData,
  specialitiesData,
} from "../../../constants/form_data";
import type { LawyerOnboardingFormData } from "../../../types";

export const ProfessionalInfoStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LawyerOnboardingFormData>();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="speciality"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Especialidad
          </label>
          <Controller
            control={control}
            name="professionalInfo.speciality"
            rules={{ required: "Debes seleccionar una especialidad" }}
            render={({ field }) => (
              <CustomSelector
                options={specialitiesData}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.professionalInfo?.speciality && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.professionalInfo.speciality.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Experiencia
          </label>
          <Controller
            control={control}
            name="professionalInfo.experience"
            rules={{ required: "Debes seleccionar tu nivel de experiencia" }}
            render={({ field }) => (
              <CustomSelector
                options={experiencesData}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.professionalInfo?.experience && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.professionalInfo.experience.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <CustomInput
          {...register("professionalInfo.education", {
            required: "La educación es requerida",
          })}
          startAdornment={
            <BuildingLibraryIcon className="size-5 text-gray-400" />
          }
          type="text"
          label="Educación"
          placeholder="Ej. Licenciatura en Derecho, Universidad Nacional Autónoma de México"
          required
        />
        {errors.professionalInfo?.education && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.professionalInfo.education.message}
          </p>
        )}
      </div>
    </>
  );
};
