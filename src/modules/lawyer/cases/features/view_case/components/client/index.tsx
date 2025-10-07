import { Avatar, AvatarFallback } from "@/components/ui";

export const Client = () => {
  return (
    <div className="bg-card rounded-md p-4">
      <h2 className="text-xl font-bold font-serif mb-4">
        Información del cliente
      </h2>
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <div className="flex flex-col gap-4">
          <Avatar className="border size-42">
            <AvatarFallback className="uppercase text-primary">
              PP
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Nombre y apellido
            </span>
            <span className="text-sm text-right">
              Maria Juana Pérez González
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Documento de identidad
            </span>
            <span className="text-sm text-right">123456789</span>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Correo electrónico
            </span>
            <span className="text-sm text-right">juan.perez@gmail.com</span>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Número de contacto
            </span>
            <span className="text-sm text-right">987654321</span>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">Archivado</span>
            <span className="text-sm text-right">No</span>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Fecha de creación
            </span>
            <span className="text-sm text-right">15/05/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};
