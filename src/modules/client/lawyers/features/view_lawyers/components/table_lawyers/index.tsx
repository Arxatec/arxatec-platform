import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  AsyncBoundary,
  PaginationController,
} from "@/components/ui";
import { Filters, ErrorState, EmptyState, LoadingState } from "..";
import { getLawyers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks";

export const TableLawyers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending, isError } = useQuery({
    queryKey: ["lawyers", page, debouncedSearch],
    queryFn: () => getLawyers(page, debouncedSearch),
  });

  return (
    <div>
      <Filters setSearch={setSearch} search={search} />
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
        LoadingComponent={<LoadingState />}
        data={data?.lawyers ?? []}
      >
        {(lawyers) => (
          <>
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
                    <TableCell>
                      {lawyer.first_name} {lawyer.last_name}
                    </TableCell>
                    <TableCell>{lawyer.email}</TableCell>
                    <TableCell>{lawyer.phone}</TableCell>
                    <TableCell>{lawyer.lawyer_details.specialty}</TableCell>
                    <TableCell>
                      {lawyer.lawyer_details.experience} años
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
            <div className="mt-4">
              <PaginationController
                setPage={setPage}
                pagination={
                  data?.pagination ?? {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 1,
                  }
                }
              />
            </div>
          </>
        )}
      </AsyncBoundary>
    </div>
  );
};
