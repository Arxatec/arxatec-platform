import { CustomInput, PrimaryButton } from "~/components/atoms";
import { RememberSection, SocialAuthOptions } from "../../molecules";

export const LoginForm = () => {
  return (
    <div className="mt-10">
      <div className="space-y-6">
        <CustomInput type="email" label="Email address" isRequired />
        <CustomInput type="password" label="Password" isRequired />
        <RememberSection />
        <PrimaryButton text="Sign in" classNames="w-full" />
      </div>

      <SocialAuthOptions />
    </div>
  );
};
