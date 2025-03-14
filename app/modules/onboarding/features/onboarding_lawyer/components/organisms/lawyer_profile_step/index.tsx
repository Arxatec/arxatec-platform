import { MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CustomInput, CustomTextArea, PrimaryButton } from "~/components/atoms";

export const LawyerProfileStep = () => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Foto de perfil
        </label>
        <div className="flex items-center gap-4">
          <img
            className="size-16 object-cover rounded-xl border border-gray-200"
            src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg"
            alt="avatar"
          />
          <PrimaryButton className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  text-center flex items-center justify-center">
            <p className="text-gray-900">Actualizar foto</p>
          </PrimaryButton>
        </div>
      </div>
      <CustomTextArea
        startAdornment={<UserIcon className="size-5 text-gray-400" />}
        label={"Biografia"}
        placeholder={"Ej: Soy abogado laboral y tengo 10 años de experiencia"}
        required
      />
      <CustomInput
        startAdornment={<MapPinIcon className="size-5 text-gray-400" />}
        type="text"
        label={"Ubicación"}
        placeholder={"Ej: Ciudad de México, México"}
        required
      />
    </>
  );
};
