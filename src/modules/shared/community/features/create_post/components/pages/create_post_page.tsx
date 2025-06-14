import { useEffect, useState } from "react";
import { Multimedia, SaveLinks, Tabs } from "../molecules";
import { CustomInput, CustomSelector, PrimaryButton } from "~/components/atoms";
import { DocumentIcon, PlusIcon } from "@heroicons/react/16/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { LegalDisclamer } from "~/modules/shared/community/components/atoms";
import { CreatePostForm } from "../organisms";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTitle } from "~/hooks/useTitle";

const communities = [
  { name: "Legal profesional", id: 1 },
  { name: "Conoce tus derechos", id: 2 },
  { name: "Mis derecho al trabajo", id: 3 },
  { name: "Derechos civiles", id: 4 },
];

export default function CreatePostPage() {
  const [selected, setSelected] = useState(communities[0]);
  const [content, setContent] = useState("");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear publicación - Arxatec");
  }, []);

  return (
    <div className=" px-4 block min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[40px_1fr_auto] mb-2 gap-2">
          <button className="flex items-center bg-white rounded-lg  shadow-sm hover:shadow-md transition-all hover:bg-gray-50 justify-center">
            <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
          </button>
          <div className="bg-white p-4 py-2 w-full  rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold">Crear publicación</h2>
          </div>
          <PrimaryButton className="flex items-center gap-2">
            <PlusIcon className="size-4 text-white" />
            Publicar
          </PrimaryButton>
        </div>
        <div className="p-4 space-y-4 mt-2 bg-white rounded-lg hover:shadow-md shadow-sm transition-all">
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
      </div>
    </div>
  );
}
