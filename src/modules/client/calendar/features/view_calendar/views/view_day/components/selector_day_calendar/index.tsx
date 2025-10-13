import { Calendar } from "@/components/ui";

interface Props {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export const SelectorDayCalendar = ({ date, setDate }: Props) => {
  return (
    <div className="hidden w-1/2 max-w-xs flex-none border-l border-muted bg-card p-6 md:block fixed top-0 right-0 h-screen overflow-y-auto z-10 pt-28">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(value: Date | undefined) => setDate(value as Date)}
        className="rounded w-full border border-muted [--cell-size:--spacing(8)] md:[--cell-size:--spacing(8)]"
        buttonVariant="ghost"
      />
    </div>
  );
};
