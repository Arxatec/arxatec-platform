import { Calendar } from "@/components/ui";
interface Props {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export const SelectorDayCalendar: React.FC<Props> = ({ date, setDate }) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(value: Date | undefined) => setDate(value as Date)}
      className="rounded w-full border border-muted [--cell-size:--spacing(8)] md:[--cell-size:--spacing(8)]"
      buttonVariant="ghost"
    />
  );
};
