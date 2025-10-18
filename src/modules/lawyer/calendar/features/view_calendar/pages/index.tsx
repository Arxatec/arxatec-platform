import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { Header, SelectorDayCalendar } from "../components";
import { ViewDayView } from "../views";
import { cn } from "@/utilities";

export default function ViewCalendarPage() {
  const { changeTitle } = useTitle();
  const [date, setDate] = useState<Date>(new Date());
  const [panelOpen, setPanelOpen] = useState<boolean>(true);

  useEffect(() => {
    changeTitle("Calendario - Arxatec");
  }, []);
  return (
    <div>
      <div className="isolate flex flex-auto bg-background">
        <SelectorDayCalendar
          date={date}
          setDate={setDate}
          panelOpen={panelOpen}
        />
        <div
          className={cn(
            "w-full h-full relative transition-all duration-300",
            panelOpen ? "pl-80" : "pl-0"
          )}
        >
          <Header
            date={date}
            setDate={setDate}
            setPanelOpen={setPanelOpen}
            panelOpen={panelOpen}
          />

          <ViewDayView date={date} />
        </div>
      </div>
    </div>
  );
}
