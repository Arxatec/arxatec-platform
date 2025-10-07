import {
  AsyncBoundary,
  Button,
  Skeleton,
  StatusMessage,
} from "@/components/ui";
import { CaseStatusLabel, CaseUrgencyLabel } from "@/types";
import { CaseCategoryLabel, type Case } from "@/types/cases";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { PencilIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  isPending: boolean;
  isError: boolean;
  data?: Case;
}

export const LoadingStateInformation = () => {
  return (
    <>
      <div className="flex items-center gap-2 justify-between mb-8 mt-4">
        <Skeleton className="w-[200px] h-8" />
      </div>
      <Skeleton className="w-full h-[250px]" />
    </>
  );
};

export const ErrorStateInformation = () => {
  return (
    <>
      <div className="flex items-center gap-2 justify-between mb-8 mt-4">
        <h2 className="text-2xl font-bold font-serif">Ver detalle del caso</h2>
      </div>
      <StatusMessage
        title="Ocurrio un error"
        description="Ocurrió un error al cargar la información del caso, intenta nuevamente, si el problema persiste, contacta al soporte."
        color="rose"
      />
    </>
  );
};

export const Information: React.FC<Props> = ({ isPending, isError, data }) => {
  const navigate = useNavigate();

  const handleUpdateCase = (id: string) => {
    navigate(ROUTES.Lawyer.UpdateCase.replace(":id", id));
  };

  return (
    <AsyncBoundary
      isLoading={isPending}
      isError={isError}
      data={data}
      LoadingComponent={<LoadingStateInformation />}
      ErrorComponent={<ErrorStateInformation />}
    >
      {(caseData) => (
        <>
          <div className="flex items-center gap-2 justify-between mb-8">
            <h1 className="text-2xl font-bold font-serif mt-4">
              {caseData.title}
            </h1>
            <Button onClick={() => handleUpdateCase(caseData.id)}>
              <PencilIcon />
              Editar
            </Button>
          </div>
          <div className="bg-card p-4 rounded-md w-full">
            <h2 className="text-xl font-bold font-serif mb-4">
              Información del caso
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold w-[150px]">
                  Título del caso:
                </span>
                <span className="text-sm text-muted-foreground">
                  {caseData.title}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-[150px]">
                    Tipo de caso:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {CaseCategoryLabel[caseData.category]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-[150px]">
                    Urgencia:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {CaseUrgencyLabel[caseData.urgency]}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-[150px]">
                    Estado:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {CaseStatusLabel[caseData.status]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-[150px]">
                    Fecha de creación:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(
                      caseData.created_at,
                      "dd 'de' MMMM 'del' yyyy",
                      {
                        locale: es,
                      }
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold w-[150px]">
                  Descripción de caso:
                </span>
                <span className="text-sm text-muted-foreground">
                  {caseData.description}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </AsyncBoundary>
  );
};
