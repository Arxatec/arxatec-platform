import {
  AvatarFallback,
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  Separator,
} from "@/components/ui";
import type { Lawyer } from "@/types";
import { Calendar, Mail, Phone } from "lucide-react";

interface Props {
  lawyers: Lawyer[];
}

export const GridLawyers: React.FC<Props> = ({ lawyers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lawyers.map((lawyer) => (
        <Card key={lawyer.id}>
          <CardContent>
            <Avatar className="size-24">
              {lawyer.profile_image && (
                <AvatarImage src={lawyer.profile_image} />
              )}
              <AvatarFallback className="uppercase text-primary">
                {lawyer.first_name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold font-serif mt-3">
              {lawyer.first_name} {lawyer.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lawyer.lawyer_details.specialty}
            </p>
            <Separator className="my-4" />
            <div className="space-y-2">
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{lawyer.email}</p>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{lawyer.phone}</p>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {lawyer.lawyer_details.experience} años de experiencia
                </p>
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
