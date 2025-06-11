import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import type { UseMutationResult } from "@tanstack/react-query";
import { PrimaryButton } from "~/components/atoms";
import type { ArticleForm } from "../../../models";

interface Props {
  onBack: () => void;
  isCreate: boolean;
  handleSubmit: (onSubmit: (formData: ArticleForm) => void) => void;
  isValid: boolean;
  onSubmit: (formData: ArticleForm) => void;
  mutationCreate: UseMutationResult<unknown, Error, FormData>;
  mutationUpdate: UseMutationResult<
    unknown,
    Error,
    { formData: FormData; id: string }
  >;
}
export const Header: React.FC<Props> = ({
  onBack,
  isCreate,
  handleSubmit,
  isValid,
  onSubmit,
  mutationCreate,
  mutationUpdate,
}) => {
  return (
    <div className="items-center mb-2 gap-2 grid grid-cols-[40px_1fr_auto]">
      <button
        onClick={onBack}
        className=" bg-white rounded-lg flex items-center justify-center h-full shadow-sm hover:shadow-md  transition-all hover:bg-gray-50"
      >
        <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
      </button>
      <div className="bg-white px-4 py-2 w-full h-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
        <h2 className="text-base font-bold">
          {isCreate ? "Crear artículo" : "Editar artículo"}
        </h2>
      </div>
      <PrimaryButton
        className="w-full h-full"
        onClick={() => handleSubmit(onSubmit)}
        disabled={!isValid}
        loader={mutationCreate.isPending || mutationUpdate.isPending}
      >
        <DocumentPlusIcon className="size-4 mr-2 text-white" />
        {isCreate ? "Crear artículo" : "Editar artículo"}
      </PrimaryButton>
    </div>
  );
};
