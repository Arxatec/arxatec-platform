import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "lucide-react";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Form } from "../components";

export default function CreateClientPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear cliente - Arxatec");
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

      <Form />
    </>
  );
}
