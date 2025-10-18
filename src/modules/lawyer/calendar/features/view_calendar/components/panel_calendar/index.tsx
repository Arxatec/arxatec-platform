import { cn } from "@/utilities";
import { SelectorDayCalendar, SoonEvents } from "../";

interface Props {
  date: Date | undefined;
  setDate: (date: Date) => void;
  panelOpen: boolean;
}

export const PanelCalendar: React.FC<Props> = ({
  date,
  setDate,
  panelOpen,
}) => {
  return (
    <div
      className={cn(
        "hidden w-1/2 max-w-xs flex-none border-r border-muted bg-card p-6 md:block fixed top-0 h-screen overflow-y-auto z-10 transition-all duration-300",
        panelOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <SelectorDayCalendar date={date} setDate={setDate} />
      <SoonEvents />
    </div>
  );
};
