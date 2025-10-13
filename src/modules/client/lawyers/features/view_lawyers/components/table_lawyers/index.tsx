import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  AsyncBoundary,
  PaginationController,
  AvatarFallback,
  AvatarImage,
  Avatar,
  Card,
  CardContent,
  Separator,
} from "@/components/ui";
import { Filters, ErrorState, EmptyState, LoadingState } from "..";
import { getLawyers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks";
import { Calendar, Mail, Phone } from "lucide-react";

export const TableLawyers = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending, isError } = useQuery({
    queryKey: ["lawyers", page, debouncedSearch],
    queryFn: () => getLawyers(page, debouncedSearch),
  });

  return (
    <div>
      <Filters
        setSearch={setSearch}
        search={search}
        setView={setView}
        view={view}
      />
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
            {view === "list" ? (
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
                      <TableCell>
                        {lawyer.lawyer_details.experience} años
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            ) : (
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
                          <p className="text-sm text-muted-foreground">
                            {lawyer.email}
                          </p>
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="size-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {lawyer.phone}
                          </p>
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="size-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {lawyer.lawyer_details.experience} años de
                            experiencia
                          </p>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
