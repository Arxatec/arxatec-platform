import {
  CalendarPlus,
  ChevronLeftIcon,
  ChevronRightIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button, ButtonGroup, Separator } from "@/components/ui";
import { useState } from "react";
import { CreateEventSheet } from "../create_event_sheet";
import { es } from "date-fns/locale";
import { addDays, formatDate, subDays } from "date-fns";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  setPanelOpen: (open: boolean) => void;
  panelOpen: boolean;
}

export const Header: React.FC<Props> = ({
  date,
  setDate,
  setPanelOpen,
  panelOpen,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex sticky top-0 w-full z-50 bg-background items-center justify-between border-b border-muted px-6 py-4">
      <div className="flex items-center gap-4 ">
        <Button
          variant="secondary"
          className="flex h-full! flex-1 "
          onClick={() => setPanelOpen(!panelOpen)}
        >
          {panelOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
        <Separator className="h-8!" orientation="vertical" />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold font-serif text-primary mb-0! leading-4">
            <time dateTime="2022-01-22" className="sm:hidden">
              {formatDate(date, "dd 'de' MMMM 'del' yyyy", {
                locale: es,
              })}
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {formatDate(date, "dd 'de' MMMM 'del' yyyy", {
                locale: es,
              })}
            </time>
          </h1>
          <p className="text-base text-muted-foreground capitalize font-serif mt-0! leading-4">
            {formatDate(date, "EEEE", {
              locale: es,
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <ButtonGroup>
          <Button variant="outline" onClick={() => setDate(subDays(date, 1))}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="outline" onClick={() => setDate(new Date())}>
            Hoy
          </Button>
          <Button variant="outline" onClick={() => setDate(addDays(date, 1))}>
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
        <Separator className="h-8!" orientation="vertical" />
        <Button type="button" onClick={() => setOpen(true)}>
          <CalendarPlus className="size-4" />
          Agregar evento
        </Button>
      </div>

      <CreateEventSheet open={open} onOpenChange={setOpen} />
    </header>
  );
};
