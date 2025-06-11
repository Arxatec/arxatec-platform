import { useQuery } from "@tanstack/react-query";
import { Redirect, useLocation } from "wouter";
import { getProfile } from "~/services";
import { useUserStore } from "~/store";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  const [location, setLocation] = useLocation();
  const setUser = useUserStore((state) => state.setUser);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
  });

  const user = useUserStore((state) => state.user);

  /*  if (!user) {
    return <Redirect to="/iniciar-sesion" />;
  }

  if (user.userType === "lawyer") {
    return <Redirect to="/app/abogado/casos" />;
  }

  if (user.userType === "client") {
    return <Redirect to="/app/cliente/casos" />;
    } */

  return <>{children}</>;
}
