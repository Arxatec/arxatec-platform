import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { register } from "../services";
import type { RegisterRequest, RegisterResponse } from "../types";
import { axiosInstance } from "@/interceptors";

// Mock del axios instance
vi.mock("@/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("Register Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRegisterRequest: RegisterRequest = {
    first_name: "Juan",
    last_name: "Pérez",
    email: "juan@example.com",
    password: "password123",
  };

  const mockRegisterResponse: RegisterResponse = {
    id: "123",
    first_name: "Juan",
    last_name: "Pérez",
    email: "juan@example.com",
    password: "password123",
  };

  it("debe llamar al endpoint correcto con los datos correctos", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: {
        data: mockRegisterResponse,
      },
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/users/register",
      mockRegisterRequest
    );
    expect(result).toEqual(mockRegisterResponse);
  });

  it("debe retornar los datos del usuario registrado", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: {
        data: mockRegisterResponse,
      },
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(result).toEqual(mockRegisterResponse);
    expect(result.id).toBe("123");
    expect(result.first_name).toBe("Juan");
    expect(result.last_name).toBe("Pérez");
    expect(result.email).toBe("juan@example.com");
  });

  it("debe manejar errores de la API", async () => {
    // Arrange
    const errorMessage = "Email already exists";
    (axiosInstance.post as unknown as Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    // Act & Assert
    await expect(register(mockRegisterRequest)).rejects.toThrow(errorMessage);
  });

  it("debe manejar errores de red", async () => {
    // Arrange
    const networkError = new Error("Network Error");
    (axiosInstance.post as unknown as Mock).mockRejectedValue(networkError);

    // Act & Assert
    await expect(register(mockRegisterRequest)).rejects.toThrow(
      "Network Error"
    );
  });

  it("debe validar que se envían todos los campos requeridos", async () => {
    // Arrange
    const incompleteRequest = {
      first_name: "Juan",
      // Falta last_name, email, password
    } as RegisterRequest;

    const mockAxiosResponse = {
      data: {
        data: mockRegisterResponse,
      },
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    await register(incompleteRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/users/register",
      incompleteRequest
    );
  });

  it("debe manejar respuestas con estructura diferente", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: {
        data: {
          ...mockRegisterResponse,
          additional_field: "extra_data",
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(result).toEqual({
      ...mockRegisterResponse,
      additional_field: "extra_data",
    });
  });
});
