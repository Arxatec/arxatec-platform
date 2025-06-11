import { PrimaryButton } from "~/components/atoms/primary_button";
import communityError from "~/assets/images/error/avatar_error.png";
import { CustomImage } from "~/components/atoms";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useLocation } from "wouter";

interface Props {
  title: string;
}

export const ProfileHeader: React.FC<Props> = ({ title }) => {
  const [, setLocation] = useLocation();
  const navigateToChats = () => setLocation("/");
  return (
    <>
      <CustomImage
        src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"
        alt="Community"
        className="w-full h-48 object-cover rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
      />
      <div className="grid grid-cols-[160px_1fr] items-center justify-between mt-2">
        <div className="w-fit h-full flex relative">
          <span className="w-40 h-40 absolute bottom-0 rounded-tr-md rounded-br-md border-t-8 border-r-8 border-slate-100 overflow-hidden bg-slate-100">
            <CustomImage
              src="https://images.pexels.com/photos/4345160/pexels-photo-4345160.jpeg"
              alt="image"
              className="w-full h-full rounded-md overflow-hidden block object-cover"
              errorImage={communityError}
            />
          </span>
        </div>
        <div className="shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden bg-white flex w-full">
          <div className="p-4 flex items-center justify-between w-full">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500">Desarrollador de software</p>
            </div>

            <div className="flex items-center gap-2">
              <PrimaryButton
                className="bg-white border-gray-300 border text-gray-700 hover:bg-gray-50 "
                onClick={navigateToChats}
              >
                Mensaje
              </PrimaryButton>
              <PrimaryButton className="gap-2">
                <ShareIcon className="size-4 text-white" />
                Compartir perfil
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
