import { Listbox } from "@headlessui/react";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

interface Props {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const TimeSelect: React.FC<Props> = ({ value, options, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-full">
        <Listbox.Button className="relative w-full py-1.5 pl-3 pr-10 text-left rounded-md border cursor-pointer focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 bg-white">
          <span className="block truncate text-gray-500 text-sm">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ClockIcon className="size-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md border shadow-lg max-h-60 overflow-auto focus:outline-none bg-white ">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ active }) =>
                `${active ? "bg-blue-600 text-white" : "text-gray-600"}
                cursor-pointer select-none relative py-1.5 pl-3 pr-9 text-sm`
              }
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } block truncate text-sm`}
                  >
                    {option}
                  </span>
                  {selected && (
                    <span
                      className={`${
                        active ? "text-white" : "text-blue-600"
                      } absolute inset-y-0 right-0 flex items-center pr-3`}
                    >
                      <CheckIcon className="size-4" strokeWidth={3} />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
