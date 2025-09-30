import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { changePassword } from "../services";
import type { ChangePasswordRequest } from "../types";
import type { Response } from "@/types";
import { axiosInstance } from "@/interceptors";

// Mock del axios instance
vi.mock("@/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("Change Password Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockChangePasswordRequest: ChangePasswordRequest = {
    email: "test@example.com",
    password: "NewPassword123!",
    confirm_password: "NewPassword123!",
  };

  const mockSuccessResponse: Response = {
    status: 200,
    message: "OK",
    description: "Contraseña cambiada exitosamente",
    timestamp: "2025-09-30T10:00:00.000Z",
    path: "/confirm",
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
    const result = await changePassword(mockChangePasswordRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/password-reset/confirm",
      mockChangePasswordRequest
    );
    expect(result).toEqual(mockSuccessResponse);
  });

  it("debe manejar errores de validación del servidor", async () => {
    // Arrange
    const validationError = {
      response: {
        status: 400,
        data: {
          message: "Las contraseñas no coinciden",
          errors: {
            confirm_password: ["Las contraseñas deben ser iguales"],
          },
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(validationError);

    // Act & Assert
    await expect(changePassword(mockChangePasswordRequest)).rejects.toEqual(
      validationError
    );
  });

  it("debe manejar errores de red", async () => {
    // Arrange
    const networkError = new Error("Network Error");
    (axiosInstance.post as unknown as Mock).mockRejectedValue(networkError);

    // Act & Assert
    await expect(changePassword(mockChangePasswordRequest)).rejects.toThrow(
      "Network Error"
    );
  });

  it("debe enviar todos los campos requeridos", async () => {
    // Arrange
    const mockAxiosResponse = {
      data: mockSuccessResponse,
    };

    (axiosInstance.post as unknown as Mock).mockResolvedValue(
      mockAxiosResponse
    );

    // Act
    await changePassword(mockChangePasswordRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/password-reset/confirm",
      {
        email: "test@example.com",
        password: "NewPassword123!",
        confirm_password: "NewPassword123!",
      }
    );
  });

  it("debe manejar errores de token expirado", async () => {
    // Arrange
    const tokenError = {
      response: {
        status: 401,
        data: {
          message: "Token expirado",
          description: "El token de recuperación ha expirado",
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(tokenError);

    // Act & Assert
    await expect(changePassword(mockChangePasswordRequest)).rejects.toEqual(
      tokenError
    );
  });
});
