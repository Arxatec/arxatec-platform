import {
  Button,
  FileDropZone,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Textarea,
  SelectValue,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateCasePage() {
  return (
    <div className="w-full">
      <Link
        to={ROUTES.Lawyer.ViewCases}
        className="flex items-center gap-2 w-fit"
      >
        <Button variant="outline" className="border-none bg-accent">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>
      <h1 className="text-2xl font-bold font-serif mt-4">Crear caso</h1>
      <div className="mt-8">
        <div className="grid gap-3">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            type="text"
            placeholder="Ej. Denuncia de violencia doméstica"
          />
        </div>

        <div className="grid md:grid-cols-2 mt-4 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="title">Tipo</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="laboral">Laboral</SelectItem>
                <SelectItem value="familia">Familia</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">Estado</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="en_revision">En revisión</SelectItem>
                <SelectItem value="en_proceso">En proceso</SelectItem>
                <SelectItem value="archivado">Archivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-3 mt-4">
          <Label htmlFor="files">Archivos</Label>
          <FileDropZone
            onFilesChange={() => {}}
            files={[]}
            acceptedTypes={["*"]}
            maxFiles={10}
            maxFileSize={5 * 1024 * 1024}
          />
        </div>

        <div className="grid gap-3 mt-4">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            className="h-[150px]"
            placeholder="Ej. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..."
          />
        </div>
      </div>
    </div>
  );
}
