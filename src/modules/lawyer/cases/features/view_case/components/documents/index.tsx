import {
  Button,
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  AsyncBoundary,
  StatusMessage,
  Skeleton,
} from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { getCaseAttachments } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreateDocumentSheet } from "../create_document_sheet";
import { CaseAttachmentCategoryLabel } from "@/types";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  id: string;
}

export const LoadingStateDocuments = () => {
  return <Skeleton className="w-full bg-card h-[500px]"></Skeleton>;
};

export const ErrorStateDocuments = () => {
  return (
    <StatusMessage
      title="Ocurrió un error"
      description="Ocurrió un error al obtener los documentos adjuntados, podrías intentar nuevamente."
      color="rose"
    />
  );
};

export const EmptyStateDocuments = () => {
  return (
    <StatusMessage
      title="No hay documentos adjuntados"
      description="No hay documentos adjuntados, podrías agregar uno en el botón que se encuentra en la parte superior derecha."
      color="white"
    />
  );
};

export const Documents: React.FC<Props> = ({ id }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ["case-attachments", id],
    queryFn: () => getCaseAttachments(id),
  });

  return (
    <div className="bg-card p-4 rounded-md w-full">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold font-serif">Documentos adjuntados</h2>
        <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
          <PlusIcon />
          Agregar documento
        </Button>
      </div>

      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={data?.attachments}
        LoadingComponent={<LoadingStateDocuments />}
        ErrorComponent={<ErrorStateDocuments />}
        EmptyComponent={<EmptyStateDocuments />}
      >
        {(attachments) => (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Identificador</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha de creación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attachments.map((attachment) => (
                  <TableRow key={attachment.id}>
                    <TableCell className="w-[150px] uppercase">
                      #{attachment.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{attachment.label}</TableCell>
                    <TableCell>
                      {CaseAttachmentCategoryLabel[attachment.category]}
                    </TableCell>
                    <TableCell>
                      {formatDate(
                        attachment.created_at,
                        "dd 'de' MMMM 'del' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </AsyncBoundary>

      <CreateDocumentSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        id={id}
      />
    </div>
  );
};
