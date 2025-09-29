import { logo } from "@/utilities";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="flex flex-col gap-6 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <img src={logo} alt="logo" className="w-auto h-8 " />
      <div className="w-full max-w-sm border rounded-lg p-6">
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
