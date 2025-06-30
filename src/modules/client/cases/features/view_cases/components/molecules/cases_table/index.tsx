import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { CustomTable } from "~/components/molecules";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { CustomStatusState } from "~/components/atoms";
import { columnsTable } from "../../../utilities";
import type { CaseModel } from "../../../models";

interface Props {
  data: CaseModel | undefined;
  isError: boolean;
}

export const CasesTable: React.FC<Props> = ({ data, isError }) => {
  const navigate = useNavigate();
  const navigateToCase = (id: string) => {
    navigate(`${ROUTES.Client.CasesPersonal}/${id}`);
  };

  if (isError) {
    return (
      <CustomStatusState
        title="Error al cargar los casos"
        message="Sucedió un error inesperado, por favor intenta nuevamente. Si el error persiste, contacta al administrador o soporte."
        icon={<ExclamationCircleIcon className="size-10 text-gray-300 mb-2" />}
      />
    );
  }

  if (data?.cases?.length === 0) {
    return (
      <CustomStatusState
        title="No tienes casos"
        message="Cuando tengas casos asignados, aparecerán aquí para que puedas gestionarlos fácilmente."
      />
    );
  }

  return (
    <CustomTable
      columns={columnsTable}
      data={data?.cases}
      onRowClick={(row) => navigateToCase(row.id)}
    />
  );
};
