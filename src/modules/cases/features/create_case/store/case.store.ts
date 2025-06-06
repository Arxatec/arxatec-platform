import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "../types";

interface User {
  id: number;
  name: string;
  avatar?: string;
}

interface CaseState {
  title: string;
  category?: Category;
  client?: User;
  description: string;
  files: Array<{
    id: string;
    file: File;
    preview?: string;
  }>;
  setTitle: (title: string) => void;
  setCategory: (category: Category) => void;
  setClient: (client: User) => void;
  setDescription: (description: string) => void;
  addFile: (file: { id: string; file: File; preview?: string }) => void;
  removeFile: (id: string) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  description: "",
  files: [],
};

export const useCaseStore = create<CaseState>()(
  persist(
    (set) => ({
      ...initialState,
      setTitle: (title) => set({ title }),
      setCategory: (category) => set({ category }),
      setClient: (client) => set({ client }),
      setDescription: (description) => set({ description }),
      addFile: (file) => set((state) => ({ files: [...state.files, file] })),
      removeFile: (id) =>
        set((state) => ({
          files: state.files.filter((f) => f.id !== id),
        })),
      reset: () => set(initialState),
    }),
    {
      name: "case-storage",
    }
  )
);
