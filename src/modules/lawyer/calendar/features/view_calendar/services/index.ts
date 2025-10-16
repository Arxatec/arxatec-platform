import { axiosInstance } from "@/interceptors";
import type { CreateEventRequest } from "../types";
import type { Events, Response } from "@/types";

export const createEvent = async (createEventRequest: CreateEventRequest) => {
  await axiosInstance.post("/calendar/events/create", createEventRequest);
};

export const getEvents = async (start: Date, end: Date): Promise<Events[]> => {
  const queryParams = new URLSearchParams();
  queryParams.append("start", start.toISOString());
  queryParams.append("end", end.toISOString());
  const { data } = await axiosInstance.get<Response<Events[]>>(
    `/calendar/events/list?${queryParams.toString()}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener los eventos");
  }
  return data.data;
};

export const deleteEvent = async (id: string) => {
  await axiosInstance.delete(`/calendar/events/delete/${id}`);
};
