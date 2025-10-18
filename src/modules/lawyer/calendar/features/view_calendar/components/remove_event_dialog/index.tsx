import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";
import { useRemoveEvent } from "../../hooks";
import { Loader2 } from "lucide-react";

interface Props {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RemoveEventDialog: React.FC<Props> = ({
  id,
  open,
  onOpenChange,
}) => {
  const { handleRemoveEvent, isPending } = useRemoveEvent();
  const handleRemoveEventClick = () => {
    handleRemoveEvent(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar evento</DialogTitle>
          <DialogDescription>
            Estás seguro de querer eliminar este evento? Esta acción no puede
            ser deshecha.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleRemoveEventClick} disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {isPending ? "Eliminando evento..." : "Eliminar evento"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
