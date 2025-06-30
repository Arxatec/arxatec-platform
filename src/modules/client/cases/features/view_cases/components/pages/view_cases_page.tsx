import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomHeader } from "~/components/molecules";
import { useTitle } from "~/hooks";
import { ROUTES } from "~/routes/routes";
import { CasesTable } from "../molecules";
import { usePersonalCases } from "../../hooks";
import { LoaderState } from "../atoms";

export default function ViewCases() {
  const { changeTitle } = useTitle();
  const { isPending, data, isError } = usePersonalCases();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);

  if (isPending) return <LoaderState />;

  return (
    <div className="min-h-screen h-full max-w-6xl mx-auto px-6">
      <CustomHeader
        title="Mis casos"
        action={
          <Link
            to={ROUTES.Client.CasesCreate}
            className="bg-blue-600 hover:bg-blue-500 transition-all px-4 text-white rounded-md  text-sm flex items-center justify-center gap-2 font-semibold"
          >
            <DocumentPlusIcon className="size-4 text-white" />
            Crear caso
          </Link>
        }
      />
      <CasesTable data={data} isError={isError} />
    </div>
  );
}
