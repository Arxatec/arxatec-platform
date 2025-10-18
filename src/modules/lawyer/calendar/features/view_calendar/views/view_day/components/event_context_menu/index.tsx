import {
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuItem,
} from "@/components/ui";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import type { CalendarEvent } from "../../types";
import { RemoveEventDialog } from "../../../../components/";
import { useState } from "react";

interface Props {
  event: CalendarEvent;
}

export const EventContextMenu: React.FC<Props> = ({ event }) => {
  const [openRemoveEventDialog, setOpenRemoveEventDialog] = useState(false);
  const handleRemoveEventClick = () => {
    setOpenRemoveEventDialog(true);
  };
  return (
    <>
      <ContextMenuContent>
        <ContextMenuItem>
          <EyeIcon className="w-4 h-4" />
          <span>Ver detalle evento</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon className="w-4 h-4" />
          <span>Editar evento</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" onClick={handleRemoveEventClick}>
          <Trash2Icon className="w-4 h-4" />
          <span>Eliminar evento</span>
        </ContextMenuItem>
      </ContextMenuContent>
      <RemoveEventDialog
        id={event.id}
        open={openRemoveEventDialog}
        onOpenChange={setOpenRemoveEventDialog}
      />
    </>
  );
};
