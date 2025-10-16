import { Card, CardContent, ScrollArea, StatusMessage } from "@/components/ui";
import { SendMessage } from "../send_message";

export const Assistant = () => {
  return (
    <Card className="h-[600px] overflow-y-auto relative py-0">
      <ScrollArea className="h-[600px] overflow-y-auto">
        <CardContent>
          <div className="pt-6">
            <h1 className="text-xl font-bold font-serif">Asistente</h1>
            <p className="text-sm text-muted-foreground">
              Este es el asistente del caso, puedes interactuar con él para
              obtener información sobre el caso o para obtener ayuda con el
              caso.
            </p>
          </div>
          <div className="w-full pt-4 ">
            <StatusMessage
              title="No hay mensajes"
              description="No hay mensajes, podrías agregar uno en el botón que se encuentra en la parte superior derecha."
              color="white"
            />
          </div>
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="sticky top-0">
              <SendMessage id={"123"} />
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
