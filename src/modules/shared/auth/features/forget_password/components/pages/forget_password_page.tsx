import { ForgotPasswordContent } from "../organism";
import { bannerForgotPassword } from "~/utilities/assets_utilities";
import { useTitle } from "~/hooks";
import { useEffect } from "react";

export default function ForgetPasswordPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Recuperar contraseña - Arxatec");
  }, []);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[35%_65%] h-screen w-full mx-auto">
      <div className="h-full flex items-center justify-center p-4 flex-col">
        <div />
        <ForgotPasswordContent />
      </div>
      <div className="w-full h-full p-2 overflow-hidden rounded-lg hidden lg:block">
        <img
          src={bannerForgotPassword}
          className="w-full h-full object-cover rounded-lg"
          alt="image"
        />
      </div>
    </div>
  );
}
