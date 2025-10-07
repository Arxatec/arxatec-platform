import { Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { CaseDetail } from "../components";

export default function ViewCasePage() {
  const { id } = useParams();

  return (
    <div>
      <Link to={ROUTES.Lawyer.ViewCases} className="flex items-center gap-2">
        <Button variant="outline" className="border-none bg-accent">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>

      <CaseDetail id={id as string} />
    </div>
  );
}
