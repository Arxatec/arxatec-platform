import { toSnakeCase } from "~/utilities/string_utilities";

interface Props {
  label?: string;
  placeholder?: string;
  type: React.HTMLInputTypeAttribute;
  isRequired?: boolean;
}

export const CustomInput: React.FC<Props> = (props) => {
  const id = toSnakeCase(props.label ?? "");
  return (
    <div>
      {props.label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900 mb-2"
        >
          {props.label}
        </label>
      )}
      <div>
        <input
          id={id}
          name={id}
          placeholder={props.placeholder}
          type={props.type}
          required={props.isRequired}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
        />
      </div>
    </div>
  );
};
