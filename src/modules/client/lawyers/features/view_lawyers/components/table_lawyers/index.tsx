import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";
import type { Lawyer } from "@/types";

interface Props {
  lawyers: Lawyer[];
}

export const TableLawyers: React.FC<Props> = ({ lawyers }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo electrónico</TableHead>
          <TableHead>Número de contacto</TableHead>
          <TableHead>Especialidad</TableHead>
          <TableHead>Experiencia</TableHead>
        </TableRow>
      </TableHeader>
      {lawyers.map((lawyer) => (
        <TableBody>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                {lawyer.profile_image && (
                  <AvatarImage src={lawyer.profile_image} />
                )}
                <AvatarFallback className="uppercase text-primary">
                  {lawyer.first_name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {lawyer.first_name} {lawyer.last_name}
            </TableCell>
            <TableCell>{lawyer.email}</TableCell>
            <TableCell>{lawyer.phone}</TableCell>
            <TableCell>{lawyer.lawyer_details.specialty}</TableCell>
            <TableCell>{lawyer.lawyer_details.experience} años</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};
