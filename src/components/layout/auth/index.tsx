import { Logo } from "@/components/ui";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className=" gap-6  w-full items-center justify-center grid grid-cols-1 md:grid-cols-[2fr_3fr] grid-rows-[100vh]">
      <div className="p-6 md:p-10 w-full h-full">
        <div className="w-full max-w-sm mx-auto h-full flex flex-col justify-center">
          <div className="w-full">
            <div className=" bg-accent rounded py-2 px-6 w-full">
              <Logo className="w-24 h-8 text-primary mx-auto" />
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <img
          src="https://images.pexels.com/photos/6077381/pexels-photo-6077381.jpeg"
          alt="auth-background"
          className="w-full h-full  object-cover"
        />
      </div>
    </div>
  );
}
