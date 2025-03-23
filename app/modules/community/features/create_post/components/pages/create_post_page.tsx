import { useState } from "react";
import { Multimedia, SaveLinks, Tabs } from "../molecules";
import { CustomInput, CustomSelector, PrimaryButton } from "~/components/atoms";
import { DocumentIcon } from "@heroicons/react/16/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { LegalDisclamer } from "~/modules/community/components/atoms";
import { CreatePostForm } from "../organisms";

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
    <div className=" px-4 block" style={{ height: "calc(100vh - 144px)" }}>
      <div className="max-w-2xl mx-auto bg-white rounded-lg hover:shadow-md shadow-sm transition-all">
        <div className="flex items-center justify-between px-6 pt-6 ">
          <div className="flex items-center gap-2">
            <DocumentArrowUpIcon className="text-gray-900 size-6" />
            <h1 className="text-lg font-bold text-gray-900">
              Crear publicación
            </h1>
          </div>
        </div>
        <div className="px-6 pb-4 space-y-4 mt-6">
          <div className="w-56 mb-8">
            <CustomSelector
              label="Elige tu comunidad"
              selected={selected}
              options={communities}
              onChange={setSelected}
            />
          </div>
          <div>
            <CreatePostForm />
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 pb-6 ">
          <PrimaryButton
            children="Cancelar"
            className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-900"
          />
          <PrimaryButton children="Publicar" />
        </div>
      </div>
      <div className="max-w-2xl w-full mx-auto mt-2">
        <LegalDisclamer />
      </div>
    </div>
  );
}
