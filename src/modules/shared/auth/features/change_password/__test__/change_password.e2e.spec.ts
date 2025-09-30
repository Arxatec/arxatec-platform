import { test, expect } from "@playwright/test";
import { ROUTES } from "@/routes/routes";

test.describe("Change Password Feature E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.Auth.ChangePassword);
  });

  test("debe navegar al login desde el enlace", async ({ page }) => {
    await page.getByRole("link", { name: /volver atrás/i }).click();
    await expect(page).toHaveURL(ROUTES.Auth.Login);
    await expect(
      page.getByRole("heading", { name: /ingresar/i })
    ).toBeVisible();
  });

  test.describe("Validaciones de formulario", () => {
    test("debe mostrar error cuando las contraseñas no coinciden", async ({
      page,
    }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem(
          "TEMPORARY_EMAIL_RESET",
          "test@example.com"
        );
      });

      await page.getByLabel("Nueva contraseña").fill("Password123!");
      await page
        .getByLabel("Confirmar contraseña")
        .fill("DifferentPassword123!");

      await page.getByRole("button", { name: "Cambiar contraseña" }).click();

      await expect(
        page.getByText("Las contraseñas no coinciden")
      ).toBeVisible();
    });

    test("debe mostrar error cuando la contraseña tiene menos de 8 caracteres", async ({
      page,
    }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem(
          "TEMPORARY_EMAIL_RESET",
          "test@example.com"
        );
      });

      await page.locator('input[name="password"]').fill("");
      await page.locator('input[name="confirm_password"]').fill("");

      await page.getByRole("button", { name: /cambiar contraseña/i }).click();

      await expect(
        page.getByText("La contraseña debe tener al menos 8 caracteres").first()
      ).toBeVisible();
    });
  });

  test("debe cambiar contraseña exitosamente y redirigir al login", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL_RESET", "test@example.com");
    });

    await page.route("**/auth/password-reset/confirm", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Contraseña cambiada exitosamente" }),
      });
    });

    await page.getByLabel("Nueva contraseña").fill("NewPassword123!");
    await page.getByLabel("Confirmar contraseña").fill("NewPassword123!");

    await page.getByRole("button", { name: "Cambiar contraseña" }).click();

    await page.waitForURL(ROUTES.Auth.Login);
    await expect(page).toHaveURL(ROUTES.Auth.Login);
    await expect(
      page.getByText("Contraseña cambiada correctamente")
    ).toBeVisible();
  });

  test("debe mostrar error cuando falla el cambio de contraseña", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("TEMPORARY_EMAIL_RESET", "test@example.com");
    });

    await page.route("**/auth/password-reset/confirm", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Error al cambiar la contraseña",
          description: "El token ha expirado",
        }),
      });
    });

    await page.getByLabel("Nueva contraseña").fill("NewPassword123!");
    await page.getByLabel("Confirmar contraseña").fill("NewPassword123!");

    await page.getByRole("button", { name: "Cambiar contraseña" }).click();

    await expect(
      page.getByText("Error al cambiar la contraseña")
    ).toBeVisible();
    await expect(page.getByText("El token ha expirado")).toBeVisible();
  });
});
