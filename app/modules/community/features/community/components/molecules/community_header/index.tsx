import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { PrimaryButton } from "~/components/atoms";
import { APP_PATHS } from "~/routes/routes";

interface Props {
  title: string;
}

export const CommunityHeader: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const navigateToCreatePost = () => navigate(APP_PATHS.CREATE_POST);

  return (
    <div>
      <img
        src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg"
        alt="Community"
        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-all"
      />
      <div className="grid grid-cols-[160px_1fr] items-center justify-between mt-2 h-full">
        <div className="w-fit h-full flex relative">
          <span className="w-40 h-40 absolute bottom-0 rounded-tr-md rounded-br-md border-t-8 border-r-8 border-slate-100 overflow-hidden bg-slate-100">
            <img
              src="https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg"
              alt="image"
              className="w-full h-full rounded-md overflow-hidden block object-cover"
            />
          </span>
        </div>
        <div className="shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden bg-white flex w-full">
          <div className="p-4 flex items-center justify-between w-full">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>

            <div className="flex items-center gap-2">
              <PrimaryButton
                className="bg-white border-gray-300 border text-gray-700 hover:bg-gray-50 gap-2"
                onClick={navigateToCreatePost}
              >
                <PlusIcon className="size-4" />
                Crear publicación
              </PrimaryButton>
              <PrimaryButton>Unirse</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
