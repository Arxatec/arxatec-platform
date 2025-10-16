import { getCurrentDate, getCurrentDay } from "@/utilities";
import { CalendarPlus, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button, ButtonGroup, Separator } from "@/components/ui";
import { useState } from "react";
import { CreateEventSheet } from "../create_event_sheet";
export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex sticky top-0 w-full z-50 bg-background items-center justify-between border-b border-muted px-6 py-4">
      <div>
        <h1 className="text-xl font-bold font-serif text-primary">
          <time dateTime="2022-01-22" className="sm:hidden">
            {getCurrentDate()}
          </time>
          <time dateTime="2022-01-22" className="hidden sm:inline">
            {getCurrentDate()}
          </time>
        </h1>
        <p className="text-lg text-muted-foreground capitalize font-serif">
          {getCurrentDay()}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <ButtonGroup>
          <Button variant="outline">
            <ChevronLeftIcon />
          </Button>
          <Button variant="outline">Hoy</Button>
          <Button variant="outline">
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
