import logo from "~/assets/images/logo.png";

interface Props {
  title: string;
  text: string;
}
export const Header: React.FC<Props> = ({ title, text }) => (
  <div>
    <img alt="Arxatec" src={logo} className="h-12 w-auto" />
    <h2 className="mt-6 xl2-b tracking-tight text-gray-900">{title}</h2>
    <p className="text-sm text-gray-500 mt-2">{text}</p>
  </div>
);
