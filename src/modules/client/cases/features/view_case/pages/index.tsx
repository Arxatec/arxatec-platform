import { Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { CaseDetail } from "../components";

export default function ViewCasePage() {
  const { id } = useParams();

  return (
    <div className="w-full max-w-5xl px-12 py-8 mx-auto">
      <Link to={ROUTES.Client.ViewCases} className="flex items-center gap-2">
        <Button variant="outline" className="border-none bg-accent">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>

      <CaseDetail id={id as string} />
    </div>
  );
}
