import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProfile } from "~/services";
import { useUserStore } from "~/store";

export const useAuth = () => {
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  const userStorage = window.localStorage.getItem("USER");
  const setUser = useUserStore((state) => state.setUser);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
  });

  useEffect(() => {
    if (!error && data) {
      setUser({
        id: data.data.id,
        name: data.data.firstName + " " + data.data.lastName,
        avatar: data.data.avatar,
        email: data.data.email,
        userType: data.data.userType,
      });
    }
  }, [error, data, setUser]);

  useEffect(() => {}, []);

  return {
    isPending,
  };
};
