interface Props {
  text: string;
  to: string;
  classNames?: string;
}
export const CustomLink: React.FC<Props> = (props) => {
  return (
    <a
      href={props.to}
      className={`font-semibold text-blue-600 hover:text-blue-500 ${props.classNames}`}
    >
      {props.text}
    </a>
  );
};
