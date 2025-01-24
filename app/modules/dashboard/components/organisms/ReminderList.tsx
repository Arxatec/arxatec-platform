import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card";
import { Avatar, AvatarFallback } from "../atoms/Avatar";

interface AvatarProps {
  bgColor: string;
  initials: string;
}

interface Perfil {
  id: number;
  avatares: AvatarProps[];
  titulo: string;
  porcentaje: string;
  diasPasados: string;
}

const TarjetaFiscalGeneral: React.FC = () => {
  const perfiles: Perfil[] = [
    {
      id: 1,
      avatares: [
        { bgColor: "bg-blue-200", initials: "YP" },
        { bgColor: "bg-blue-300", initials: "JV" },
        { bgColor: "bg-blue-400", initials: "YA" },
        { bgColor: "bg-yellow-400", initials: "YO" },
        { bgColor: "bg-orange-400", initials: "HU" },
      ],
      titulo: "Gestor de Casos",
      porcentaje: "93%",
      diasPasados: "0 Lo en 3 días",
    },
    {
      id: 2,
      avatares: [
        { bgColor: "bg-gray-200", initials: "KL" },
        { bgColor: "bg-amber-700", initials: "MN" },
        { bgColor: "bg-gray-400", initials: "OP" },
        { bgColor: "bg-gray-500", initials: "QR" },
        { bgColor: "bg-orange-300", initials: "ST" },
      ],
      titulo: "Gestor de Casos",
      porcentaje: "55%",
      diasPasados: "0 Lo en 3 días",
    },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {perfiles.map((perfil) => (
        <Card key={perfil.id} className="border shadow-sm">
          <CardHeader>
            {/* Header sin título */}
            <CardTitle>{""}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {/* Avatares */}
              <div className="flex -space-x-2">
                {perfil.avatares.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`border-2 border-background ${avatar.bgColor}`}
                  >
                    <AvatarFallback>{avatar.initials || "U"}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              {/* Detalles */}
              <div>
                <div className="text-gray-900 font-semibold">
                  {perfil.titulo}
                </div>
                <div className="flex space-x-2 text-sm">
                  <span className="text-gray-600">{perfil.porcentaje}</span>
                  <span className="text-gray-400">{perfil.diasPasados}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TarjetaFiscalGeneral;
