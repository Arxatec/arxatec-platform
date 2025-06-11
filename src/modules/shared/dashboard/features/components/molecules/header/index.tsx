import { PlusIcon } from "@heroicons/react/16/solid";
import { PrimaryButton } from "~/components/atoms";

interface Props {
  name: string;
}
export const Header: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <p className="text-gray-600 text-sm">Welcome Back</p>
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <div className="flex items-center gap-4">
        <PrimaryButton className="gap-2">
          <PlusIcon className="w-4 h-4" />
          <span>Create case</span>
        </PrimaryButton>
      </div>
    </div>
  );
};
