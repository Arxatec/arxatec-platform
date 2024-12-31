import { CustomLink } from "~/components/atoms";

export const Header = () => (
  <div>
    <img
      alt="Your Company"
      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
      className="h-10 w-auto"
    />
    <h2 className="mt-8 xl2-b tracking-tight text-gray-900">
      Sign in to your account
    </h2>
    <p className="mt-2 sm-n">
      Not a member? <CustomLink text="Start a 14 a day free trial" to="" />
    </p>
  </div>
);
