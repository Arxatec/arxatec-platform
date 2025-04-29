import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { CardLawyer } from "../molecules";

export default function ViewLawyersPage() {
  return (
    <div className="mx-auto max-w-7xl w-full min-h-screen">
      <div className="mt-2 bg-white rounded-lg p-4 flex gap-2 w-full items-center">
        <div className="w-full">
          <CustomInput
            placeholder="Buscar..."
            className="w-full"
            label="Buscar abogado"
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
              label="Expecialidad"
            />
          </div>
          <div className="w-44">
            <CustomSelector
              options={[
                { id: 1, name: "+2 años" },
                { id: 2, name: "+1 año" },
                { id: 3, name: "+3 años" },
                { id: 4, name: "+5 años" },
                { id: 5, name: "+10 años" },
              ]}
              selected={{ id: 1, name: "+2 años" }}
              onChange={(categoria) => {
                console.log("Categoría seleccionada:", categoria);
              }}
              label="Experiencia"
            />
          </div>
          <div className="w-44">
            <CustomSelector
              options={[
                { id: 1, name: "Nuevos" },
                { id: 2, name: "Populares" },
                { id: 3, name: "Expertos" },
                { id: 4, name: "Casos ganados" },
              ]}
              selected={{ id: 1, name: "Más reciente" }}
              onChange={(categoria) => {
                console.log("Categoría seleccionada:", categoria);
              }}
              label="Ordenar por"
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-2 w-full mt-2">
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
        <CardLawyer />
      </div>
    </div>
  );
}
