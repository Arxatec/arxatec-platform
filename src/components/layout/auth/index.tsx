import { Logo } from "@/components/ui";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="flex flex-col gap-6 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex items-center justify-center px-6">
        <div className=" bg-accent rounded p-2 w-full">
          <Logo className="w-24 h-8 text-primary mx-auto" />
        </div>
      </div>
      <div className="w-full max-w-sm p-6">
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
