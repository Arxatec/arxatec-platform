import { LanguageSelector } from "~/modules/auth/components/molecules";
import { ForgotPasswordContent } from "../organism";
import logo from "~/assets/images/logo.png";

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
          src="https://images.pexels.com/photos/26646636/pexels-photo-26646636/free-photo-of-blanco-y-negro-arte-edificio-estatua.png"
          className="w-full h-full object-cover rounded-lg"
          alt="image"
        />
      </div>
    </div>
  );
}
