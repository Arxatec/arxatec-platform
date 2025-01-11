import { Header, HeroImage } from "../molecules";
import { RegisterForm } from "../organisms";

export default function RegisterPage() {
  return (
    <div className="flex h-screen p-2 rounded-md">
      <div className="flex flex-1 h-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Header />
          <RegisterForm />
        </div>
      </div>
      <HeroImage />
    </div>
  );
}
