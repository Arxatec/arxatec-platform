import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { register } from "../services";
import type { RegisterRequest } from "../types";
import type { Response } from "@/types";
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
    confirm_password: "password123",
  };

  const mockSuccessResponse: Response = {
    status: 200,
    message: "OK",
    description: "Código de verificación enviado correctamente.",
    timestamp: "2025-09-29T02:18:02.800Z",
    path: "/request",
  };

  it("debe llamar al endpoint correcto con los datos correctos", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: mockSuccessResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/register/request",
      mockRegisterRequest
    );
    expect(result).toEqual(mockSuccessResponse);
  });

  it("debe retornar la respuesta completa del servidor", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: mockSuccessResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(result).toEqual(mockSuccessResponse);
    expect(result.status).toBe(200);
    expect(result.message).toBe("OK");
    expect(result.description).toBe(
      "Código de verificación enviado correctamente."
    );
    expect(result.timestamp).toBe("2025-09-29T02:18:02.800Z");
    expect(result.path).toBe("/request");
  });

  it("debe manejar errores de validación del servidor", async () => {
    // Arrange
    const validationError = {
      response: {
        status: 400,
        data: {
          message: "El correo electrónico ya está registrado",
          errors: {
            email: ["El correo electrónico ya está en uso"],
          },
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(validationError);

    // Act & Assert
    await expect(register(mockRegisterRequest)).rejects.toEqual(
      validationError
    );
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

  it("debe manejar errores del servidor (500)", async () => {
    // Arrange
    const serverError = {
      response: {
        status: 500,
        data: {
          message: "Error interno del servidor",
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(serverError);

    // Act & Assert
    await expect(register(mockRegisterRequest)).rejects.toEqual(serverError);
  });

  it("debe enviar todos los campos requeridos incluyendo confirm_password", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: mockSuccessResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    await register(mockRegisterRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/register/request", {
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan@example.com",
      password: "password123",
      confirm_password: "password123",
    });
  });

  it("debe manejar respuesta con diferentes mensajes", async () => {
    // Arrange
    const alternativeResponse: Response = {
      status: 200,
      message: "SUCCESS",
      description: "Usuario registrado exitosamente",
      timestamp: "2025-09-29T02:20:00.000Z",
      path: "/auth/register/request",
    };

    const mockAxiosResponse = {
      data: alternativeResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    const result = await register(mockRegisterRequest);

    // Assert
    expect(result).toEqual(alternativeResponse);
    expect(result.message).toBe("SUCCESS");
    expect(result.description).toBe("Usuario registrado exitosamente");
  });

  it("debe llamar exactamente una vez al axios post", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: mockSuccessResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    await register(mockRegisterRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledTimes(1);
  });
});
