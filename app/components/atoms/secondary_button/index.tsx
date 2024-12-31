import { SpinnerLoader } from "..";

interface Props {
  text: string;
  loader?: boolean;
  onClick?: () => void;
  classNames?: string;
  leading?: React.ReactNode;
}
export const SecondaryButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  text-center flex items-center justify-center ${props.classNames}`}
    >
      {!props.loader && props.leading}
      {props.loader ? <SpinnerLoader color="#111827 " size={18} /> : props.text}
    </button>
  );
};
