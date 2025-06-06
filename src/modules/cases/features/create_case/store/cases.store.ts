import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "../types";
import type { Client } from "./clients.store";

export interface Case {
  id: number;
  title: string;
  category: Category;
  client: Client;
  description: string;
  files: Array<{
    id: string;
    file: File;
    preview?: string;
  }>;
  createdAt: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
}

interface CasesState {
  cases: Case[];
  addCase: (caseData: Omit<Case, "id" | "createdAt" | "status">) => void;
  updateCaseStatus: (id: number, status: Case["status"]) => void;
  getCases: () => Case[];
}

export const useCasesStore = create<CasesState>()(
  persist(
    (set, get) => ({
      cases: [],
      addCase: (caseData) =>
        set((state) => ({
          cases: [
            ...state.cases,
            {
              ...caseData,
              id: state.cases.length + 1,
              createdAt: new Date().toISOString(),
              status: "pending",
            },
          ],
        })),
      updateCaseStatus: (id, status) =>
        set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      getCases: () => get().cases,
    }),
    {
      name: "cases-storage",
    }
  )
);
