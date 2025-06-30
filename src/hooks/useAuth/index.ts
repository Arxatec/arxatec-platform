import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "~/services";
import { useUserStore } from "~/store";

export const useAuth = () => {
  const token =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("TOKEN_AUTH")
      : null;

  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const queryEnabled = !!token && !user;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
    enabled: queryEnabled,
    retry: false,
  });

  useEffect(() => {
    if (data?.data && !user) {
      const { id, firstName, lastName, avatar, email, userType } = data.data;
      setUser({
        id,
        name: `${firstName} ${lastName}`,
        avatar,
        email,
        userType,
      });
    }
  }, [data, user, setUser]);

  return {
    token,
    user: user || data?.data || null,
    isPending: isLoading,
    isError,
    error,
  };
};
