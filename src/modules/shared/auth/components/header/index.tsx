interface Props {
  title: string;
  description: string;
}

export const Header: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-xl font-extrabold font-serif">{title}</h1>
      <p className="text-sm text-secondary-foreground">{description}</p>
    </div>
  );
};
