import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  url: string;
  imageUrl: string;
}

interface ClientsState {
  clients: Client[];
  addClient: (client: Omit<Client, "id">) => void;
  getClients: () => Client[];
}

export const useClientsStore = create<ClientsState>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (client) =>
        set((state) => ({
          clients: [
            ...state.clients,
            {
              ...client,
              id: state.clients.length + 1,
            },
          ],
        })),
      getClients: () => get().clients,
    }),
    {
      name: "clients-storage",
    }
  )
);
