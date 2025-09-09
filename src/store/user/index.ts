import type { User } from "@/types";
import { create } from "zustand";

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
