import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Multimedia, SaveLinks } from "../molecules";
import {
  CustomInput,
  CustomSelector,
  PrimaryButton,
  SecondaryButton,
} from "~/components/atoms";

const communities = [
  { name: "Legal profesional", id: 1 },
  { name: "Conoce tus derechos", id: 2 },
  { name: "Mis derecho al trabajo", id: 3 },
  { name: "Derechos civiles", id: 4 },
];

export default function CreatePostPage() {
  const [selected, setSelected] = useState(communities[0]);
  const [content, setContent] = useState("");
  return (
    <div className=" px-4 block">
      <div className="max-w-3xl mx-auto bg-white rounded-lg">
        <div className="flex items-center justify-between px-6 pt-6 ">
          <h1 className="text-lg font-bold text-gray-900">Crear publicación</h1>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Borradores
          </button>
        </div>

        <div className="px-6 pb-4 space-y-4 mt-6">
          <div className="grid grid-cols-2 items-center justify-center gap-4">
            <CustomInput
              label="Título de la publicación"
              type="text"
              placeholder="Ej. Título"
            />
            <CustomSelector
              label="Elige tu comunidad"
              selected={selected}
              options={communities}
              onChange={setSelected}
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm/6 font-medium text-gray-900 mb-2"
            >
              Contenido de la publicación
            </label>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe tu contenido aquí..."
                className="w-full min-h-[200px] px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none resize-none border-none text-sm"
              />
            </div>
          </div>
          <Multimedia />
          <SaveLinks />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 pb-6 ">
          <SecondaryButton text="Guardar borrador" />
          <PrimaryButton text="Publicar" />
        </div>
      </div>
    </div>
  );
}
