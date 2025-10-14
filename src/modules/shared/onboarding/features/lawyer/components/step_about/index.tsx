import { Button, Input, Label, Slider, Textarea } from "@/components/ui";
import { useState } from "react";

interface Props {
  handleNextStep: () => void;
}

export const StepAbout: React.FC<Props> = ({ handleNextStep }) => {
  const [experience, setExperience] = useState(3);
  return (
    <>
      <div className="mt-8 space-y-4">
        <div>
          <Label className="mb-2 block">Licencia</Label>
          <Input placeholder="Ej. CAL-2024-12345" className="w-full" />
        </div>
        <div>
          <Label className="mb-2 block">Cuentanos un poco sobre ti</Label>
          <Textarea
            placeholder="Ej. Abogado experto en derecho laboral..."
            className="w-full"
          />
        </div>
        <div>
          <Label className="mb-2 block">Experiencia</Label>
          <Slider
            value={[experience]}
            max={50}
            min={1}
            step={1}
            onValueChange={(value) => setExperience(value[0])}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <span> {experience} año</span>
            <span>50 años</span>
          </div>
        </div>
      </div>

      <Button className="w-full mt-8" onClick={handleNextStep}>
        Continuar
      </Button>
    </>
  );
};
