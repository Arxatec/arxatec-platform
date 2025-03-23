import { CommunityCard } from "../../molecules";

interface Community {
  id: number;
  name: string;
  description: string;
  members: string;
  icon: string;
}

interface Props {
  title: string;
  description: string;
  communities: Community[];
}

export const CommunitiesCard: React.FC<Props> = ({
  title,
  description,
  communities,
}) => {
  return (
    <div className="">
      <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md mb-2">
        <h2 className="text-lg text-gray-900 font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {communities.map((community, idx) => (
          <CommunityCard
            key={idx}
            name={community.name}
            description={community.description}
            id={idx + 1}
            icon={community.name}
            members={community.members}
          />
        ))}
      </div>
    </div>
  );
};
