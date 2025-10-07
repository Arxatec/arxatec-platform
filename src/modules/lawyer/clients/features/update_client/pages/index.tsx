import { AsyncBoundary, Button } from "@/components/ui";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "lucide-react";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExternalClient } from "../services";
import { ErrorState, Form, LoadingState } from "../components";

export default function UpdateClientPage() {
  const { changeTitle } = useTitle();
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["external-client", id],
    queryFn: () => getExternalClient(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    changeTitle("Editar cliente - Arxatec");
  }, []);
  return (
    <>
      <Link
        to={ROUTES.Lawyer.ViewClients}
        className="flex items-center gap-2 w-fit"
      >
        <Button variant="outline" className="border-none bg-accent">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>

      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={data}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => <Form defaultValues={data} />}
      </AsyncBoundary>
    </>
  );
}
