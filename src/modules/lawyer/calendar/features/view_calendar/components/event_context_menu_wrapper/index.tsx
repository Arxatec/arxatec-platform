import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui";
import { RemoveEventDialog, UpdateEventSheet } from "../";
import { useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface Props {
  eventId: string;
  children: React.ReactNode;
}
export const EventContextMenuWrapper: React.FC<Props> = ({
  eventId,
  children,
}) => {
  const [openRemoveEventDialog, setOpenRemoveEventDialog] = useState(false);
  const [openUpdateEventSheet, setOpenUpdateEventSheet] = useState(false);

  const handleUpdateEvent = () => setOpenUpdateEventSheet(true);
  const handleRemoveEvent = () => setOpenRemoveEventDialog(true);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild onClick={handleUpdateEvent}>
        {children}
      </ContextMenuTrigger>

      {/* Context Menu Content */}
      <ContextMenuContent>
        <ContextMenuItem onClick={handleUpdateEvent}>
          <PencilIcon className="w-4 h-4" />
          <span>Editar evento</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" onClick={handleRemoveEvent}>
          <Trash2Icon className="w-4 h-4" />
          <span>Eliminar evento</span>
        </ContextMenuItem>
      </ContextMenuContent>

      {/* Modals */}
      <UpdateEventSheet
        id={eventId}
        open={openUpdateEventSheet}
        onOpenChange={setOpenUpdateEventSheet}
      />
      <RemoveEventDialog
        id={eventId}
        open={openRemoveEventDialog}
        onOpenChange={setOpenRemoveEventDialog}
      />
    </ContextMenu>
  );
};
