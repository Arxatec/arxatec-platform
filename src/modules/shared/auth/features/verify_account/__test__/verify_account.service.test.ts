import { describe, it, expect, vi } from "vitest";
import { resendCode, verifyCode } from "../services";
import { axiosInstance } from "@/interceptors";
import type { ResendRequest, VerifyCodeRequest } from "../types";

vi.mock("@/interceptors");

describe("verify_account services", () => {
  describe("resendCode", () => {
    it("debe enviar una solicitud de reenvío correctamente", async () => {
      const mockResponse = { data: { message: "Código reenviado" } };
      vi.mocked(axiosInstance.post).mockResolvedValue(mockResponse);

      const request: ResendRequest = { email: "test@example.com" };
      const result = await resendCode(request);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/auth/register/resend",
        request
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("debe manejar errores en el reenvío", async () => {
      const mockError = new Error("Error de red");
      vi.mocked(axiosInstance.post).mockRejectedValue(mockError);

      const request: ResendRequest = { email: "test@example.com" };

      await expect(resendCode(request)).rejects.toThrow("Error de red");
    });
  });

  describe("verifyCode", () => {
    it("debe verificar el código correctamente", async () => {
      const mockResponse = { data: { message: "Código verificado" } };
      vi.mocked(axiosInstance.post).mockResolvedValue(mockResponse);

      const request: VerifyCodeRequest = {
        email: "test@example.com",
        code: "1234",
      };
      const result = await verifyCode(request);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/auth/register/verify-code",
        request
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("debe manejar errores en la verificación", async () => {
      const mockError = new Error("Código inválido");
      vi.mocked(axiosInstance.post).mockRejectedValue(mockError);

      const request: VerifyCodeRequest = {
        email: "test@example.com",
        code: "1234",
      };

      await expect(verifyCode(request)).rejects.toThrow("Código inválido");
    });
  });
});
