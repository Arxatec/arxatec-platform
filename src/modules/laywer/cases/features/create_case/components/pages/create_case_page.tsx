import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useGetCategoriesCase, useGuardCategoriesCase } from "../../hooks";
import { CreateCaseContent } from "../organism";
import { Loader } from "../molecules";

export default function CreateCasePage() {
  const { changeTitle } = useTitle();
  const { data, isPending, error } = useGetCategoriesCase();
  useGuardCategoriesCase(data, error);

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);

  if (isPending) return <Loader />;
  return <CreateCaseContent categories={data} />;
}
