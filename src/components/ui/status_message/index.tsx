import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  description: string;
  color?: "rose" | "white";
}
const colorVariants = {
  rose: {
    background: "bg-status-background-error",
    textPrimary: "text-status-foreground-error",
    textSecondary: "text-status-foreground-error opacity-80",
  },
  white: {
    background: "bg-accent",
    textPrimary: "text-card-foreground",
    textSecondary: "text-card-foreground/80",
  },
};

export const StatusMessage: React.FC<Props> = ({
  title,
  description,
  color = "rose",
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded mb-4 px-10 py-6",
        colorVariants[color].background
      )}
    >
      <div className="flex flex-col gap-2">
        <h2
          className={twMerge(
            "text-xl font-bold font-serif",
            colorVariants[color].textPrimary
          )}
        >
          {title}
        </h2>
        <p className={twMerge("text-sm", colorVariants[color].textSecondary)}>
          {description}
        </p>
      </div>
    </div>
  );
};
