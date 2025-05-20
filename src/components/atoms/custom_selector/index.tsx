import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

interface Props<T> {
  label?: string;
  options: T[];
  selected: T;
  onChange: (option: T) => void;
  buttonClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  displayKey?: keyof T;
  buttonWidth?: string;
  buttonCustomStyles?: string;
}

const baseButtonClasses = {
  layout: "flex cursor-pointer items-center justify-between relative py-1.5",
  appearance: "rounded-md bg-white py-1.5 pl-3 pr-2",
  text: "text-left text-gray-900 text-sm",
  cursor: "cursor-default",
  outline: "outline outline-1 -outline-offset-1 outline-gray-300",
  focus:
    "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600",
};

export const CustomSelector = <T extends Record<string, any>>({
  label,
  options,
  selected,
  onChange,
  buttonClassName = "",
  optionClassName = "",
  labelClassName = "",
  displayKey = "name",
  buttonWidth = "w-full",
  buttonCustomStyles = "",
}: Props<T>) => {
  const computedButtonClasses = [
    baseButtonClasses.layout,
    baseButtonClasses.appearance,
    baseButtonClasses.text,
    baseButtonClasses.cursor,
    baseButtonClasses.outline,
    baseButtonClasses.focus,
    buttonWidth,
    buttonCustomStyles,
    buttonClassName,
  ].join(" ");

  return (
    <div>
      <Listbox value={selected} onChange={onChange}>
        {label && (
          <label
            className={`block text-sm font-medium text-gray-900 mb-2 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative cursor-pointer">
          <ListboxButton className={computedButtonClasses}>
            <span className=" truncate pr-6">
              {selected[displayKey] as string}
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="size-4  text-gray-500 sm:size-4"
            />
          </ListboxButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md bg-white py-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className={`group relative cursor-default select-none py-1 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none ${optionClassName} cursor-pointer transition-all`}
                >
                  <span className="block truncate font-normal group-data-[selected]:font-semibold">
                    {option[displayKey] as string}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
