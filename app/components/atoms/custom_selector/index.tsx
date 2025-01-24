import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
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
  layout: "grid grid-cols-1 relative",
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
            className={`block text-sm font-medium text-gray-900 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative mt-2">
          <ListboxButton className={computedButtonClasses}>
            <span className="col-start-1 row-start-1 truncate pr-6">
              {selected[displayKey] as string}
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={`group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none ${optionClassName}`}
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
        </div>
      </Listbox>
    </div>
  );
};
