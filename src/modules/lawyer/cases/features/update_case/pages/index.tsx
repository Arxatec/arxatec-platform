import { Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { Form } from "../components";

export default function UpdateCasePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Editar caso - Arxatec");
  }, []);
  return (
    <div className="w-full">
      <Link
        to={ROUTES.Lawyer.ViewCases}
        className="flex items-center gap-2 w-fit"
      >
        <Button variant="outline" className="border-none bg-accent">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>
      <Form />
    </div>
  );
}
