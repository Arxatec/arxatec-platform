import { Button, Input } from "@/components/ui";
import { SendIcon } from "lucide-react";

export const Communication = () => {
  return (
    <div className="bg-card p-4 rounded-md w-full h-full">
      <div className="flex items-center gap-4">
        <span className="w-full h-[1px] bg-muted-foreground/10 flex-1"></span>
        <p className="text-sm text-muted-foreground text-center">Hoy</p>
        <span className="w-full h-[1px] bg-muted-foreground/10 flex-1"></span>
      </div>
      <div className="my-4 min-h-[650px] space-y-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Juan Pérez
            </span>
            <span className="text-sm text-muted-foreground">10:00</span>
          </div>
          <p className="text-sm text-primary">Hola ¿Cómo estás?</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Carlos González <span className="italic text-primary">(Tú)</span>
            </span>
            <span className="text-sm text-muted-foreground">10:01</span>
          </div>
          <p className="text-sm text-primary">Hola ¿Cómo estás?</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-accent border rounded-md py-1 px-1">
        <Input
          placeholder="Escribe un mensaje"
          className="bg-transparent! border-none shadow-none"
        />
        <Button>
          <SendIcon />
          Enviar
        </Button>
      </div>
    </div>
  );
};
