import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  description: string;
  color?: "rose" | "white";
}
const colorVariants = {
  rose: {
    background: "bg-rose-500/10",
    textPrimary: "text-rose-800",
    textSecondary: "text-rose-700",
  },
  white: {
    background: "bg-neutral-100/5",
    textPrimary: "text-neutral-100",
    textSecondary: "text-neutral-100/80",
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
