import { useState } from "react";
import { CustomSelector, CustomToggle } from "~/components/atoms";

const idealClients = [
  {
    id: 1,
    name: "Empresas",
  },
  {
    id: 2,
    name: "Casos específicos",
  },
  {
    id: 3,
    name: "Individuos",
  },
  {
    id: 4,
    name: "Cualquiera",
  },
];

const communicationPreferences = [
  {
    id: 1,
    name: "Mensajeria",
  },
  {
    id: 2,
    name: "Videollamada",
  },
  {
    id: 3,
    name: "Llamada",
  },
  {
    id: 4,
    name: "Correo electrónico",
  },
];

const paymentMethods = [
  {
    id: 2,
    name: "Transferencia bancaria",
  },
  {
    id: 3,
    name: "Tarjeta de crédito/débito ",
  },
  {
    id: 5,
    name: "Tarjeta de crédito",
  },
  {
    id: 5,
    name: "Criptomonedas",
  },
  {
    id: 6,
    name: "Contra factura",
  },
  {
    id: 7,
    name: "Débito automático",
  },
];
export const PreferencesStep = () => {
  const [idealClient, setIdealClient] = useState(idealClients[0]);
  const [communicationPreference, setCommunicationPreference] = useState(
    communicationPreferences[0]
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  return (
    <>
      <div>
        <label
          htmlFor={"experience"}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Metodo de pago favorito
        </label>
        <CustomSelector
          options={paymentMethods}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Tu cliente ideal
          </label>
          <CustomSelector
            options={idealClients}
            selected={idealClient}
            onChange={setIdealClient}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Comunicación preferida
          </label>
          <CustomSelector
            options={communicationPreferences}
            selected={communicationPreference}
            onChange={setCommunicationPreference}
          />
        </div>
      </div>
      <CustomToggle label="¿Cobras consulta inicial?" />
      <CustomToggle
        label="¿Quieres recibir notificaciones?"
        description="Recibe notificaciones cuando un cliente te envía un mensaje o cada vez que un cliente crea un nuevo caso."
      />
    </>
  );
};
