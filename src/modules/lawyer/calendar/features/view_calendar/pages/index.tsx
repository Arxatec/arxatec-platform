import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header } from "../components";
import { ViewDayView } from "../views";

export default function ViewCalendarPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Calendario - Arxatec");
  }, []);
  return (
    <div className="flex flex-col relative w-full h-full overflow-visible">
      <Header />
      <ViewDayView />
    </div>
  );
}
