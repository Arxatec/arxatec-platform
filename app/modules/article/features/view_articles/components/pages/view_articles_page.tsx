import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CustomInput, CustomSelector, PrimaryButton } from "~/components/atoms";
import { CardArticle } from "../molecules";

export default function ViewArticles() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full min-h-screen">
      <div className="bg-white px-4 py-4 rounded-md mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Todos los articulos
          </h2>
          <PrimaryButton className="text-sm flex items-center gap-2">
            <PlusIcon className="size-4 text-white" strokeWidth={2} />
            Nuevo articulo
          </PrimaryButton>
        </div>
        <div className="mt-4 flex gap-2 w-full items-center">
          <div className="w-full">
            <CustomInput
              placeholder="Buscar articulo..."
              className="w-full"
              startAdornment={
                <MagnifyingGlassIcon className="size-4 text-gray-400" />
              }
            />
          </div>
          <div className="flex gap-2">
            <div className="w-44">
              <CustomSelector
                options={[
                  { id: 1, name: "Todos" },
                  { id: 2, name: "Abogados" },
                  { id: 3, name: "Derechos laborales" },
                  { id: 4, name: "Derechos civiles" },
                  { id: 5, name: "Familia" },
                  { id: 6, name: "Legal profesional" },
                  { id: 7, name: "Corporativo" },
                ]}
                selected={{ id: 1, name: "Todos" }}
                onChange={(categoria) => {
                  console.log("Categoría seleccionada:", categoria);
                }}
              />
            </div>
            <div className="w-44">
              <CustomSelector
                options={[
                  { id: 1, name: "Última semana" },
                  { id: 2, name: "Último mes" },
                  { id: 3, name: "Último año" },
                ]}
                selected={{ id: 1, name: "Última semana" }}
                onChange={(categoria) => {
                  console.log("Categoría seleccionada:", categoria);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <CardArticle />
        <CardArticle />
        <CardArticle />
        <CardArticle />
        <CardArticle />
        <CardArticle />
        <CardArticle />
      </div>
    </div>
  );
}
