import {
  ArrowLeftIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { DocumentPlusIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  CustomInput,
  CustomSelector,
  CustomTextArea,
  PrimaryButton,
} from "~/components/atoms";
import { APP_PATHS } from "~/routes/routes";
import { SelectUser } from "../molecules";

export default function CreateCasePage() {
  const navigate = useNavigate();
  const onBack = () => navigate(APP_PATHS.CASES);
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <SelectUser open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          onClick={onBack}
          className="flex items-center bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
        >
          <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
        </button>
        <div className="bg-white p-4 w-full  rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
          <h2 className="text-base font-bold">Crear caso</h2>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full">
              <CustomInput
                placeholder="Ej. Reclamación de daños por incumplimiento contractual"
                label="Título del caso"
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <CustomSelector
              label="Categoría"
              options={[
                {
                  name: "Derecho Civil",
                  id: 1,
                },
                {
                  name: "Derecho Laboral",
                  id: 2,
                },
              ]}
              selected={{
                name: "Derecho Civil",
                id: 1,
              }}
              onChange={() => {}}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-900">
              Seleccionar cliente
            </label>
            <button
              onClick={() => setOpen(true)}
              className="text-left text-sm text-gray-400 block border border-gray-300 w-full rounded-md px-4 py-1.5 mt-2 "
            >
              Seleccionar...
            </button>
          </div>
          <div className="mt-4">
            <CustomTextArea
              placeholder="Ej. Escribe aquí la descripción del caso"
              label="Descripción del caso"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all max-w-md w-full">
          <div className="h-full flex flex-col">
            <label className="text-sm font-medium text-gray-900">
              Adjuntar multimedia
            </label>
            <button
              type="button"
              className="relative mt-2 flex  flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden h-full"
              aria-label="Subir portada del artículo"
              tabIndex={0}
            >
              <DocumentIcon className="size-10 mx-auto text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-500">
                Subir un documento
              </span>
              <span className=" text-xs text-gray-500">
                Arrastra y suelta un documento o haz clic para seleccionar (máx.
                5MB)
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <PrimaryButton className="w-fit">
          <DocumentPlusIcon className="size-4 mr-2 text-white" />
          Crear caso
        </PrimaryButton>
      </div>
    </div>
  );
}
