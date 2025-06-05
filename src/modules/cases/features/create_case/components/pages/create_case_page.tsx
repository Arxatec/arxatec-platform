import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTitle } from "~/hooks/useTitle";
import { CreateCaseContent } from "../organism";
import { getAllCategories } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { ToastManager } from "~/components/molecules/toast_manager";

export default function CreateCasePage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, [changeTitle]);

  useEffect(() => {
    if (error) {
      ToastManager.error(
        "Error al cargar las categorías",
        "Sucedio un error inesperado al intentar obtener las categorias vuelve a intentarlo mas tarde."
      );
    }
  }, [error]);

  return (
    <div>
      {isLoading && (
        <div className="min-h-screen w-full max-w-6xl mx-auto">
          <div className="bg-slate-200 rounded-lg h-[40px] w-full animate-pulse"></div>
          <div className="mt-2 grid md:grid-cols-2 gap-2">
            <div className="bg-slate-200 rounded-lg h-[800px] w-full animate-pulse"></div>
            <div className="bg-slate-200 rounded-lg h-[800px] w-full animate-pulse"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <CreateCaseContent onBack={onBack} categories={categories} />
      )}
    </div>
  );
}
