import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../atoms/table";
import { Checkbox } from "../../atoms/checkbox";
import { Button } from "../../atoms/button";
import { MoreHorizontal, Filter } from "lucide-react";
import * as ReactLazyLoadImageComponent from "react-lazy-load-image-component";
const { LazyLoadImage } = ReactLazyLoadImageComponent;

// Definición de la interfaz para una factura
interface Factura {
  id: string;
  nombreCliente: string;
  nombreCaso: string;
  estado: "pagado" | "pendiente" | "no pagado";
  urlAvatar: string;
}

// Datos de facturas
const facturas: Factura[] = [
  {
    id: "1",
    nombreCliente: "Juan Perez",
    nombreCaso: "Nombre del Caso",
    estado: "pagado",
    urlAvatar:
      "https://i.pinimg.com/236x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg",
  },
  {
    id: "2",
    nombreCliente: "Maria Gomez",
    nombreCaso: "Nombre del Caso",
    estado: "pendiente",
    urlAvatar:
      "https://i.pinimg.com/236x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg",
  },
  {
    id: "3",
    nombreCliente: "Carlos Ramirez",
    nombreCaso: "Nombre del Caso",
    estado: "pagado",
    urlAvatar:
      "https://i.pinimg.com/236x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg",
  },
  {
    id: "4",
    nombreCliente: "Lucia Fernandez",
    nombreCaso: "Nombre del Caso",
    estado: "no pagado",
    urlAvatar:
      "https://i.pinimg.com/236x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg",
  },
];

const ListaFacturas: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Casos Recientes
        </h1>
        <Button variant="outline" size="sm" className="text-gray-500">
          <Filter className="h-4 w-4 mr-2" />
          Filtro
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Nombre del Cliente</TableHead>
            <TableHead>Caso</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facturas.map((factura) => (
            <TableRow key={factura.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <LazyLoadImage
                    src={factura.urlAvatar}
                    alt=""
                    className="rounded-full"
                    width={32}
                    height={32}
                    effect="blur" // Efecto de difuminado mientras carga
                  />
                  <span className="font-medium">{factura.nombreCliente}</span>
                </div>
              </TableCell>
              <TableCell>{factura.nombreCaso}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    factura.estado === "pagado"
                      ? "bg-green-100 text-green-700"
                      : factura.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {factura.estado.charAt(0).toUpperCase() +
                    factura.estado.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaFacturas;
