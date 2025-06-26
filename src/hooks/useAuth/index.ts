import { useQuery } from "@tanstack/react-query";
import { getProfile } from "~/services";
import { useUserStore } from "~/store";

export const useAuth = () => {
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const queryEnabled = !!token && !user;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
    enabled: queryEnabled,
    retry: false,
  });

  if (data?.data && !user) {
    const userData = {
      id: data.data.id,
      name: data.data.firstName + " " + data.data.lastName,
      avatar: data.data.avatar,
      email: data.data.email,
      userType: data.data.userType,
    };
    setUser(userData);
  }

  return {
    token,
    user: user || data?.data || null,
    isPending,
    isError,
    error,
  };
};
