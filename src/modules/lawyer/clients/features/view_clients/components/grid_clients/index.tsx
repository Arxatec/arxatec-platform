import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuSeparator,
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import type { ExternalClient } from "@/types";
import {
  ArchiveIcon,
  EyeIcon,
  IdCardIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
} from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  clients: ExternalClient[];
  handleViewDetails: (client: ExternalClient) => void;
  handleArchiveExternalClient: (client: ExternalClient) => void;
}

export const GridClients: React.FC<Props> = ({
  clients,
  handleViewDetails,
  handleArchiveExternalClient,
}) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
      {clients.map((client) => (
        <ContextMenu key={client.id}>
          <ContextMenuTrigger asChild>
            <Card key={client.id}>
              <CardContent>
                <Avatar className="size-20">
                  {client.profile_image && (
                    <AvatarImage src={client.profile_image} />
                  )}
                  <AvatarFallback className="uppercase text-primary">
                    {client.full_name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-bold font-serif mt-3">
                  {client.full_name}
                </h2>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="flex items-center gap-2">
                    <MailIcon className="size-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {client.email}
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <PhoneIcon className="size-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {client.phone}
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <IdCardIcon className="size-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {client.dni}
                    </p>
                  </span>
                </div>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem onClick={() => handleViewDetails(client)}>
              <EyeIcon className="w-4 h-4" />
              <span>Ver detalles</span>
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() =>
                navigate(ROUTES.Lawyer.UpdateClient.replace(":id", client.id))
              }
            >
              <PencilIcon className="w-4 h-4" />
              <span>Editar</span>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => handleArchiveExternalClient(client)}
            >
              <ArchiveIcon className="w-4 h-4" />
              <span>Archivar</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};
