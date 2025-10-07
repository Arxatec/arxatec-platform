import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Textarea,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { TakeCaseSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import type { TakeCaseRequest } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { takeCase } from "../../services";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

interface Props {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  titleCase: string;
}
export const TakeCaseDialog: React.FC<Props> = ({
  id,
  open,
  setOpen,
  titleCase,
}) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TakeCaseRequest>({
    resolver: zodResolver(TakeCaseSchema),
  });

  const { mutate: takeCaseMutation, isPending } = useMutation({
    mutationFn: (data: TakeCaseRequest) => takeCase(id, data),
  });

  const onSuccess = () => {
    setOpen(false);
    toast.success("Caso tomado correctamente", {
      description: "Te estamos redirigiendo a la lista de casos.",
    });
    navigate(ROUTES.Lawyer.ViewCase.replace(":id", id));
  };

  const onError = (error: Error) => {
    toast.error("Error al tomar caso", {
      description: error.message,
    });
  };

  const onSubmit = (data: TakeCaseRequest) => {
    takeCaseMutation(data, {
      onSuccess,
      onError,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tomar caso</DialogTitle>
          <DialogDescription>
            Se te asignará como el abogado encargado del caso y podrás contactar
            al cliente de "{titleCase}" para obtener más información.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder="Ej. Trabajando en el caso... "
            {...register("note")}
            className={twMerge(errors.note && "border-rose-500/10 border")}
          />
          {errors.note && (
            <p className="text-rose-500 mt-2 text-sm">{errors.note.message}</p>
          )}
          <DialogFooter className="mt-4">
            <Button type="submit">
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Tomando caso..." : "Tomar caso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
