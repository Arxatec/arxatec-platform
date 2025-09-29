import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "@/store/user";
import { USER_TYPE, type User } from "@/types";

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Juan Pérez",
  email: "juan@example.com",
  user_type: USER_TYPE.LAWYER,
};
describe("useUserStore", () => {
  beforeEach(() => {
    // Limpiar el store antes de cada test
    useUserStore.getState().deleteUser();
  });

  it("debe tener un estado inicial correcto", () => {
    const { user } = useUserStore.getState();
    expect(user).toBeNull();
  });

  it("debe establecer un usuario correctamente", () => {
    const { setUser } = useUserStore.getState();

    setUser(mockUser);

    const { user } = useUserStore.getState();
    expect(user).toEqual(mockUser);
  });

  it("debe eliminar un usuario correctamente", () => {
    const { setUser, deleteUser } = useUserStore.getState();

    // Primero establecer un usuario
    setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);

    // Luego eliminarlo
    deleteUser();
    expect(useUserStore.getState().user).toBeNull();
  });

  it("debe actualizar el usuario cuando se establece uno nuevo", () => {
    const { setUser } = useUserStore.getState();

    // Establecer usuario inicial
    setUser(mockUser);

    // Crear nuevo usuario
    const newUser: User = {
      ...mockUser,
      id: "2",
      name: "María García",
      email: "maria@example.com",
    };

    // Actualizar usuario
    setUser(newUser);

    const { user } = useUserStore.getState();
    expect(user).toEqual(newUser);
    expect(user?.name).toBe("María García");
  });
});
