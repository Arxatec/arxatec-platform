import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateEventType } from "../../types";
import { createEventSchema } from "../../schemas";

export const useUpdateEventForm = () => {
  const form = useForm<UpdateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      start_time: "10:30",
      end_time: "11:30",
      location: "",
      description: "",
      color: "bg-stone-900",
      date: new Date(),
    },
  });

  return form;
};
