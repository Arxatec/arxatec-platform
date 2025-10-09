import {
  Button,
  Label,
  PopoverTrigger,
  PopoverContent,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Popover,
  CommandInput,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getExternalClients } from "../../services";
import { Check, ChevronsUpDown, Loader2, SearchXIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { FieldErrors, Control } from "react-hook-form";
import type { CreateCaseRequest } from "../../types";
import { useController } from "react-hook-form";

interface Props {
  control: Control<CreateCaseRequest>;
  errors: FieldErrors<CreateCaseRequest>;
}

export const ClientSelect: React.FC<Props> = ({ control, errors }) => {
  const [open, setOpen] = useState(false);

  const { field } = useController({
    name: "external_client_id",
    control,
    defaultValue: "",
  });

  const { data: externalClients, isPending: isPendingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getExternalClients(1),
  });

  return (
    <div className="grid gap-3 w-full">
      <Label htmlFor="external_client_id">Cliente</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className=" w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={twMerge(
              "w-full justify-between bg-card",
              errors.external_client_id && "border-rose-500/10! border!",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? externalClients?.clients.find(
                  (client) => client.id === field.value
                )?.full_name
              : "Seleccionar cliente..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Buscar cliente..." />
            <CommandList className="w-full h-full">
              <CommandEmpty className="p-6 h-auto flex text-muted-foreground  items-center flex-col justify-center gap-2 text-sm">
                <SearchXIcon className="size-7 " />
                <p>No se encontró ningún cliente.</p>
              </CommandEmpty>
              <CommandGroup>
                {isPendingClients ? (
                  <CommandItem
                    value="loading"
                    disabled
                    className="flex flex-col p-6"
                  >
                    <Loader2 className="size-5 animate-spin" />
                    Cargando...
                  </CommandItem>
                ) : (
                  externalClients?.clients.map((client) => (
                    <CommandItem
                      className="w-full"
                      key={client.id}
                      value={client.id}
                      onSelect={(currentValue) => {
                        field.onChange(
                          currentValue === field.value ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Avatar>
                        <AvatarImage src={client.profile_image || undefined} />
                        <AvatarFallback className="uppercase text-primary">
                          {client.full_name.charAt(0)}
                          {client.full_name.charAt(1)}
                        </AvatarFallback>
                      </Avatar>
                      {client.full_name}
                      <Check
                        className={twMerge(
                          "ml-auto",
                          field.value === client.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errors.external_client_id && (
        <p className="text-sm text-rose-500">
          {errors.external_client_id.message}
        </p>
      )}
    </div>
  );
};
