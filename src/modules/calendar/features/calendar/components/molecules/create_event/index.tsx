import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CustomCalendar,
  CustomInput,
  CustomTextArea,
  PrimaryButton,
  Schedule,
  TimeSelect,
} from "~/components/atoms";

const generateTimeOptions = (): string[] => {
  const timeOptions: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return timeOptions;
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const CreateEvent: React.FC<Props> = ({ open, setOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [selectedTimeStart, setSelectedTimeStart] = useState<string>("08:00");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<string>("18:00");

  const timeOptions = generateTimeOptions();

  const handleTimeChangeStart = (value: string) => {
    setSelectedTimeStart(value);
  };
  const handleTimeChangeEnd = (value: string) => {
    setSelectedTimeEnd(value);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="flex items-center justify-between">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Crear evento
                </DialogTitle>
                <button
                  onClick={() => setOpen(!open)}
                  className="rounded-full p-1 group focus:ring focus:ring-blue-600 hover:bg-gray-100 transition-all outline-none"
                >
                  <XMarkIcon className="size-5 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <CustomInput
                  label="Título"
                  placeholder="Ej. Reunión para el caso de derecho laboral"
                />
                <CustomTextArea
                  label="Descripción"
                  placeholder="Escribe aquí..."
                />

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-semibold mb-2">
                        Fecha
                      </label>
                      <CustomCalendar
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholder="Seleccionar fecha"
                        format="dd/MM/yyyy"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-semibold mb-2">
                        Inicio
                      </label>
                      <TimeSelect
                        value={selectedTimeStart}
                        options={timeOptions}
                        onChange={handleTimeChangeStart}
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-semibold mb-2">
                        Final
                      </label>
                      <TimeSelect
                        value={selectedTimeEnd}
                        options={timeOptions}
                        onChange={handleTimeChangeEnd}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur amet labore.
                  </p>
                </div>
                <CustomInput
                  label="Enlace"
                  placeholder="Ej. https://meet.google.com/srf-rgbm-uzr"
                />
                <div className="flex items-center gap-2 justify-end mt-4">
                  <PrimaryButton className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
                    Cancelar
                  </PrimaryButton>
                  <PrimaryButton>Crear evento</PrimaryButton>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
