import {
  Avatar,
  AvatarFallback,
  Button,
  Input,
  Label,
  type LocationData,
} from "@/components/ui";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { LocationInput } from "../location_input";
import { useState } from "react";

interface Props {
  handlePreviousStep: () => void;
}

export const StepContact: React.FC<Props> = ({ handlePreviousStep }) => {
  const [location, setLocation] = useState<LocationData | undefined>(undefined);
  return (
    <div className="mt-8 space-y-4">
      <div>
        <Label className="mb-2 block">
          Foto de perfil{" "}
          <span className="text-xs text-muted-foreground">(Opcional)</span>
        </Label>
        <div className="flex items-center gap-2">
          <Avatar className="size-20">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            className="border-none bg-card hover:bg-accent/80"
            variant="outline"
          >
            <PlusIcon className="size-4" />
            Cambiar foto
          </Button>
        </div>
      </div>
      <div>
        <Label className="mb-2 block">Número de celular</Label>
        <Input placeholder="Ej. +51 999999999" className="w-full" />
      </div>
      <div>
        <Label className="mb-2 block">Linkedin</Label>
        <Input
          placeholder="Ej. https://linkedin.com/in/carlos-rodriguez-abogado"
          className="w-full"
        />
      </div>

      <LocationInput value={location} onChange={setLocation} />

      <div className="flex items-center justify-between gap-2 mt-8">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <Button className="flex-1">Completar perfil</Button>
      </div>
    </div>
  );
};
