import type { ElementType } from "react";

interface Props {
  title: string;
  value: string;
  icon: ElementType;
}

export const ProfileItemInfo: React.FC<Props> = ({
  title,
  value,
  icon: Icon,
}) => (
  <span className="flex items-center gap-2 justify-between py-3 ">
    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon className="size-4 text-gray-700" />
      {title}
    </span>
    <span className="text-gray-500 text-sm">{value}</span>
  </span>
);
