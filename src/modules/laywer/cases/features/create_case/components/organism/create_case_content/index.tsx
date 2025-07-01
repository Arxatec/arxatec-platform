import { useState, useRef } from "react";
import type { FormValues } from "../../../interface";
import type { ClientModel, LegalCategoryModel } from "../../../models";
import { HeaderSection, CaseForm, FileUploadSection } from "../../molecules";
import type { FileUploadSectionRef } from "../../molecules/file_upload_section";
import { Controller, useForm } from "react-hook-form";
import { TextRich } from "~/components/organisms";
import { createCaseWithFiles } from "../../../services";
import { useToastMutation } from "~/components/molecules/toast_manager";
import type { CreateCaseDTO } from "../../../dtos";
import { SelectEntity } from "~/components/molecules";
import { useQueryClient } from "@tanstack/react-query";

type UploadedFile = {
  id: string;
  category_id: number;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface Props {
  categories: LegalCategoryModel[];
  clients: ClientModel[];
}

export const CreateCaseContent = ({ categories, clients }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: categories[0],
    },
    mode: "onTouched",
  });

  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);
  const fileUploadRef = useRef<FileUploadSectionRef>(null);

  const createCaseMutation = useToastMutation({
    mutationOptions: {
      mutationFn: (data: { case: CreateCaseDTO; files: FormData[] }) =>
        createCaseWithFiles(data.files, data.case),
      onSuccess: () => {
        // Resetear el formulario a sus valores por defecto
        reset({
          category: categories[0],
          title: "",
          description: "",
          clientId: undefined,
        });
        // Limpiar el usuario seleccionado
        setSelectedUser(undefined);
        // Limpiar los archivos subidos
        fileUploadRef.current?.reset();
      },
    },
    toastOptions: {
      loading: {
        title: "Creando caso",
        content: "Estamos creando tu caso, por favor espera un momento.",
      },
      success: {
        title: "Caso creado correctamente",
        content:
          "Tu caso fue creado correctamente dentro, un abogado podra atender tu caso, espera un momento.",
      },
      error: {
        title: "Error al intentar crear el caso",
        content:
          "Opps sucedio un error, intenta nuevamente por favor, si el problema persiste, contacta con el administrador.",
      },
    },
  });

  const [isUserSelectorOpen, setIsUserSelectorOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ClientModel | undefined>();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUserSelect = (user: ClientModel) => {
    setSelectedUser(user);
    setValue("clientId", user.clientId);
    setIsUserSelectorOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Archivos subidos:", uploadedFiles);

    const formDataList = uploadedFiles.map((file) => {
      const formData = new FormData();
      formData.append("category_id", file.category_id.toString());
      formData.append("label", file.label);
      formData.append("description", file.description);
      formData.append("file", file.file);
      return formData;
    });

    if (data.clientId) {
      // Caso privado - incluir información del abogado
      const privateCase: CreateCaseDTO = {
        title: data.title,
        description: data.description,
        category_id: data.category.id,
        is_public: false,
        client_id: data.clientId,
      };
      await createCaseMutation.mutateAsync({
        case: privateCase,
        files: formDataList,
      });
      queryClient.invalidateQueries({ queryKey: ["personal-cases"] });
      console.log("Datos del caso privado:", privateCase);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <SelectEntity<ClientModel>
        open={isUserSelectorOpen}
        setOpen={setIsUserSelectorOpen}
        items={clients}
        onSelect={handleUserSelect}
        getId={(l) => l.id}
        getLabel={(l) => l.name}
        getAvatar={(l) => l.avatar}
        filterFn={(l, q) => l.name.toLowerCase().includes(q.toLowerCase())}
        renderDetails={(l) => (
          <dl className="grid grid-cols-1 text-sm text-gray-700">
            <dt className="font-semibold">Email</dt>
            <dd>{l.email}</dd>
            <dt className="font-semibold mt-1">Teléfono</dt>
            <dd>{l.phone}</dd>
            <dt className="font-semibold mt-1">DNI</dt>
            <dd>{l.dni}</dd>
          </dl>
        )}
        placeholder="Buscar cliente..."
        buttonLabel="Seleccionar cliente"
      />

      <HeaderSection
        onCreateCase={() => formRef.current?.requestSubmit()}
        isLoading={createCaseMutation.isPending}
      />

      <div className="grid grid-cols-2 gap-2">
        <CaseForm
          control={control}
          errors={errors}
          onOpenUserSelector={() => setIsUserSelectorOpen(true)}
          selectedUser={selectedUser}
          categories={categories}
          watch={watch}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          ref={formRef}
        />
        <FileUploadSection
          ref={fileUploadRef}
          onFilesChange={setUploadedFiles}
        />
      </div>
      <div className="mt-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
        <label className="text-sm font-medium text-gray-900">
          Descripción del caso
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: "La descripción es requerida",
            maxLength: {
              value: 2000,
              message: "La descripción no puede tener más de 2000 caracteres",
            },
          }}
          render={({ field }) => (
            <>
              <TextRich
                value={field.value}
                onChange={field.onChange}
                minHeight="250px"
                maxHeight="600px"
                className="mt-2"
                showImageMenu={false}
                showTableMenu={false}
                showYoutubeMenu={false}
                showFontSelector={false}
              />
              {errors.description && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
