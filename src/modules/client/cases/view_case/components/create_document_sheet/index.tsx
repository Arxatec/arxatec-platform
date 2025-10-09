import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Label,
  FileDropZone,
  SheetFooter,
  Button,
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/ui";
import { createDocumentSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateDocumentRequest } from "../../types";
import { CaseAttachmentCategoryLabel } from "@/types";
import { mapToOptions } from "@/utilities";
import { FilePlus2, FileTextIcon, Loader2, Trash2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "../../services";
import { toast } from "sonner";

interface Props {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
  id: string;
}

export const CreateDocumentSheet: React.FC<Props> = ({
  isSheetOpen,
  setIsSheetOpen,
  id,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateDocumentRequest>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      file: null as unknown as File,
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createDocumentMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => createDocument(data, id),
  });

  const files = watch("file");

  const onSuccess = () => {
    toast.success("Documento agregado correctamente", {
      description: "El documento ha sido agregado correctamente",
    });
    setIsSheetOpen(false);
    queryClient.invalidateQueries({ queryKey: ["case-attachments", id] });
  };

  const onError = (error: Error) => {
    toast.error("Error al agregar documento", {
      description: error.message,
    });
  };

  const onSubmit = (data: CreateDocumentRequest) => {
    const createDocumentFormData = new FormData();
    createDocumentFormData.append("case_id", id);
    createDocumentFormData.append("label", data.name);
    if (data.description) {
      createDocumentFormData.append("description", data.description);
    }
    createDocumentFormData.append("category", data.category);
    createDocumentFormData.append("file", data.file);

    createDocumentMutation(createDocumentFormData, {
      onSuccess,
      onError,
    });
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={isPending ? undefined : setIsSheetOpen}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar documento</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <div className="px-4 py-4 space-y-4 flex-1">
            <FormInput
              name={"name"}
              label="Nombre"
              placeholder="Ej. Contrato firmado"
              register={register}
              errors={errors}
            />
            <div>
              <FormTextarea
                name={"description"}
                label="Descripción"
                placeholder="Ej. Versión final con firmas"
                register={register}
                errors={errors}
                optional
              />
            </div>
            <div className="w-full">
              <FormSelect
                name={"category"}
                label="Categoría"
                options={mapToOptions(CaseAttachmentCategoryLabel)}
                placeholder="Selecciona una categoría"
                control={control}
                errors={errors}
              />
            </div>
            <div>
              <Label className="mb-2 block">Documentos</Label>
              {!files && (
                <FileDropZone
                  className={twMerge(
                    errors.file && "border-rose-500/10 border"
                  )}
                  maxFiles={1}
                  multiple={false}
                  onFilesChange={async (files: File[]): Promise<void> => {
                    if (files.length > 0) {
                      setValue("file", files[0]);
                      await trigger("file");
                    } else {
                      setValue("file", null as unknown as File);
                      await trigger("file");
                    }
                  }}
                />
              )}
              <div>
                {files && files.name && (
                  <div className="bg-accent p-4 rounded-md flex items-center justify-between">
                    <div className=" flex items-center gap-2 ">
                      <div className="bg-primary/10 rounded-md p-2">
                        <FileTextIcon className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">
                          {files.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {files.size} kb
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-fit"
                      onClick={async () => {
                        setValue("file", undefined as unknown as File);
                        await trigger("file");
                      }}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
              {errors.file && (
                <p className="text-sm text-rose-500 mt-2">
                  {errors.file.message}
                </p>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FilePlus2 className="size-4" />
              )}
              {isPending ? "Agregando documento..." : "Agregar documento"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
