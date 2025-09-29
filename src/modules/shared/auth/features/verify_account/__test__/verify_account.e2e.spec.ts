import { test, expect } from "@playwright/test";
import { ROUTES } from "@/routes/routes";

test.describe("Verify Account Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.Auth.VerifyAccount);
  });

  test("debe mostrar la página de verificación correctamente", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Verificar cuenta - Arxatec/);
    await expect(page.getByText("Verificar cuenta")).toBeVisible();
    await expect(
      page.getByText(
        "Enviamos un código de verificación a tu correo electrónico."
      )
    ).toBeVisible();
    await expect(page.locator("[data-slot='input-otp-slot']")).toHaveCount(4);
    await expect(
      page.getByRole("button", { name: "Verificar código" })
    ).toBeVisible();
    await expect(page.getByText("No recibiste el código?")).toBeVisible();
  });

  test("debe mostrar error cuando el código no tiene 4 dígitos", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL", "test@example.com");
    });

    const otpInput = page.locator("[data-slot='input-otp']");
    await otpInput.fill("123");

    await page.getByRole("button", { name: "Verificar código" }).click();

    await expect(
      page.getByText("El código debe tener 4 dígitos")
    ).toBeVisible();
  });

  test("debe permitir reenviar el código", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL", "test@example.com");
    });

    await page.route("**/auth/register/resend", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Código reenviado" }),
      });
    });

    await page.getByRole("button", { name: "Reenviar código" }).click();

    await expect(
      page.getByText("Código reenviado correctamente")
    ).toBeVisible();
  });

  test("debe mostrar error cuando falla el reenvío", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL", "test@example.com");
    });

    await page.route("**/auth/register/resend", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Error",
          description: "No se pudo reenviar el código",
        }),
      });
    });

    await page.getByRole("button", { name: "Reenviar código" }).click();

    await expect(page.getByText("Error al reenviar código")).toBeVisible();
    await expect(page.getByText("No se pudo reenviar el código")).toBeVisible();
  });

  test("debe redirigir al login después de verificación exitosa", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL", "test@example.com");
    });

    await page.route("**/auth/register/verify-code", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Cuenta verificada" }),
      });
    });

    const otpInput = page.locator("[data-slot='input-otp']");
    await otpInput.fill("1234");

    await page.getByRole("button", { name: "Verificar código" }).click();

    await page.waitForURL(ROUTES.Auth.Login);
    await expect(page).toHaveURL(ROUTES.Auth.Login);
  });

  test("debe mostrar error cuando falla la verificación", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL", "test@example.com");
    });

    await page.route("**/auth/register/verify-code", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Error",
          description: "Código inválido o expirado",
        }),
      });
    });

    const otpInput = page.locator("[data-slot='input-otp']");
    await otpInput.fill("1234");

    await page.getByRole("button", { name: "Verificar código" }).click();

    await expect(
      page
        .locator("[data-title]")
        .filter({ hasText: "Código inválido o expirado" })
    ).toBeVisible();
  });
});
