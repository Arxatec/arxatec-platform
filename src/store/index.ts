import { create } from "zustand";

interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  userType: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  deleteUser: () => set({ user: null }),
}));
