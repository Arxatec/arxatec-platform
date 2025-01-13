import { Link } from "react-router";

interface Props {
  text: string;
  to: string;
  classNames?: string;
}
export const CustomLink: React.FC<Props> = (props) => {
  return (
    <Link
      to={props.to}
      className={`font-semibold text-blue-600 hover:text-blue-500 ${props.classNames}`}
    >
      {props.text}
    </Link>
  );
};
