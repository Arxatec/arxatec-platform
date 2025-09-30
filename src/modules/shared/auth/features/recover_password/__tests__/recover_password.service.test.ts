import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { recoverPassword } from "../services";
import type { RecoverPasswordRequest } from "../types";
import type { Response } from "@/types";
import { axiosInstance } from "@/interceptors";

// Mock del axios instance
vi.mock("@/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("Recover Password Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRecoverPasswordRequest: RecoverPasswordRequest = {
    email: "juan@example.com",
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
    const result = await recoverPassword(mockRecoverPasswordRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/password-reset/request",
      mockRecoverPasswordRequest
    );
    expect(result).toEqual(mockSuccessResponse);
  });

  it("debe manejar errores de validación del servidor", async () => {
    // Arrange
    const validationError = {
      response: {
        status: 400,
        data: {
          message: "El correo electrónico no está registrado",
          errors: {
            email: ["El correo electrónico no existe en el sistema"],
          },
        },
      },
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(validationError);

    // Act & Assert
    await expect(recoverPassword(mockRecoverPasswordRequest)).rejects.toEqual(
      validationError
    );
  });

  it("debe manejar errores de red", async () => {
    // Arrange
    const networkError = new Error("Network Error");
    (axiosInstance.post as unknown as Mock).mockRejectedValue(networkError);

    // Act & Assert
    await expect(recoverPassword(mockRecoverPasswordRequest)).rejects.toThrow(
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
    await recoverPassword(mockRecoverPasswordRequest);

    // Assert
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/password-reset/request",
      {
        email: "juan@example.com",
      }
    );
  });
});
