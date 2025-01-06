import { SpinnerLoader } from "..";

interface Props {
  text: string;
  loader?: boolean;
  onClick?: () => void;
  classNames?: string;
}

export const PrimaryButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center justify-center text-center ${props.classNames}`}
    >
      {props.loader ? <SpinnerLoader size={18} /> : props.text}
    </button>
  );
};
