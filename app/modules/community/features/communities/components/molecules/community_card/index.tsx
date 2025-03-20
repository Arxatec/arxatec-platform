import { CustomAvatar } from "~/components/atoms";

interface Props {
  id: number;
  icon: string;
  name: string;
  description: string;
  members: string;
}
export const CommunityCard: React.FC<Props> = ({
  id,
  icon,
  name,
  description,
  members,
}) => {
  return (
    <button
      key={id}
      className="flex items-start gap-3 p-3 rounded-md cursor-pointer justify-start bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="w-6 text-gray-500 text-sm font-medium">{id}</div>
      <div className="flex-shrink-0">
        <CustomAvatar avatar={icon} size={"2.5rem"} username={name} />
      </div>
      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-medium text-sm text-left">{name}</h3>
        <p className="text-sm text-gray-600 truncate text-left">
          {description}
        </p>
        <p className="text-xs text-gray-500 text-left">{members}</p>
      </div>
    </button>
  );
};
