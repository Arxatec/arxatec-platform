import { Link } from "react-router-dom";
import { Button } from "..";

interface Props {
  title: string;
  description?: string;
  button?: {
    label: string;
    url: string;
    icon: React.ElementType;
  };
}

export const CustomHeader: React.FC<Props> = ({
  title,
  description,
  button,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold font-serif">{title}</h1>
        {description && (
          <p className="text-sm text-secondary-foreground max-w-xl">
            {description}
          </p>
        )}
      </div>
      {button && (
        <Link to={button.url}>
          <Button>
            <button.icon />
            {button.label}
          </Button>
        </Link>
      )}
    </div>
  );
};
