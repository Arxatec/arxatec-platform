interface Props {
  title: string;
  description: string;
}

export const Header: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-serif text-center">{title}</h1>
      <p className="text-sm text-secondary-foreground text-center">
        {description}
      </p>
    </div>
  );
};
