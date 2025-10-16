import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuSeparator,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import type { ExternalClient } from "@/types";
import {
  ArchiveIcon,
  EyeIcon,
  IdCard,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  clients: ExternalClient[];
  handleViewDetails: (client: ExternalClient) => void;
  handleArchiveExternalClient: (client: ExternalClient) => void;
}

export const TableClients: React.FC<Props> = ({
  clients,
  handleViewDetails,
  handleArchiveExternalClient,
}) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="flex items-center gap-2">
              <UserIcon className="size-4 text-muted-foreground" />
              Nombre completo
            </span>
          </TableHead>
          <TableHead>
            <span className="flex items-center gap-2">
              <MailIcon className="size-4 text-muted-foreground" />
              Correo electrónico
            </span>
          </TableHead>
          <TableHead>
            <span className="flex items-center gap-2">
              <PhoneIcon className="size-4 text-muted-foreground" />
              Número de contacto
            </span>
          </TableHead>
          <TableHead>
            <span className="flex items-center gap-2">
              <IdCard className="size-4 text-muted-foreground" />
              Documento de identidad
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <ContextMenu key={client.id}>
            <ContextMenuTrigger asChild>
              <TableRow onClick={() => handleViewDetails(client)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      {client.profile_image && (
                        <AvatarImage src={client.profile_image} />
                      )}
                      <AvatarFallback className="uppercase text-primary">
                        {client.full_name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {client.full_name}
                  </div>
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.dni}</TableCell>
              </TableRow>
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
      </TableBody>
    </Table>
  );
};
