import { Header, HeroImage } from "../molecules";
import { LoginForm } from "../organisms/login_form";
import "~/styles/index.css";

export default function LoginPage() {
  return (
    <div className="flex h-screen  ">
      <div className="flex flex-1 h-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Header />
          <LoginForm />
        </div>
      </div>
      <HeroImage />
    </div>
  );
}
