import { LanguageSelector } from "~/modules/auth/components/molecules";
import { ForgotPasswordContent } from "../organism";
import { bannerForgotPassword, logo } from "~/utilities/assets_utilities";

export default function ForgetPasswordPage() {
  return (
    <div className=" grid grid-cols-[35%_65%] h-screen w-full mx-auto">
      <div className="h-full flex items-center justify-center p-4 flex-col">
        <div className="flex items-center justify-between w-full px-4">
          <img src={logo} alt="logo" className="w-32" />
          <LanguageSelector />
        </div>
        <ForgotPasswordContent />
      </div>
      <div className="w-full h-full p-2 overflow-hidden rounded-lg">
        <img
          src={bannerForgotPassword}
          className="w-full h-full object-cover rounded-lg"
          alt="image"
        />
      </div>
    </div>
  );
}
