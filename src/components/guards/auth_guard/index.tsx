import { useQuery } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { LoaderSplash } from "~/components/molecules/loader_splash";
import { ROUTES } from "~/routes/routes";
import { getProfile } from "~/services";
import { useUserStore } from "~/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  const setUser = useUserStore((state) => state.setUser);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
  });

  if (!token) {
    window.sessionStorage.removeItem("TOKEN_AUTH");
    return <Redirect to={`~${ROUTES.Auth}${ROUTES.AuthRoutes.Login}`} />;
  }

  if (isPending) {
    return <LoaderSplash />;
  }

  if (!data || isError) {
    window.sessionStorage.removeItem("TOKEN_AUTH");
    window.sessionStorage.setItem("ERROR_JOIN", error?.message);
    return <Redirect to={`~${ROUTES.Auth}${ROUTES.AuthRoutes.Login}`} />;
  }

  setUser({
    id: data.data.id,
    name: data.data.firstName + " " + data.data.lastName,
    avatar: data.data.avatar,
    email: data.data.email,
    userType: data.data.userType,
  });

  if (data.data.userType === null) {
    return (
      <Redirect to={`~${ROUTES.Auth}${ROUTES.AuthRoutes.OnboardingGeneral}`} />
    );
  }

  return <>{children}</>;
}
