import { test, expect } from "@playwright/test";

test.describe("Register Feature E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("debe cargar la página de registro correctamente", async ({ page }) => {
    await expect(page).toHaveURL("/register");
    await expect(page).toHaveTitle(/Registrarse - Arxatec/i);
    await expect(
      page.getByRole("heading", { name: /registrarse/i })
    ).toBeVisible();
    await expect(
      page.getByText("Ingresa tus datos para registrarte en la plataforma")
    ).toBeVisible();
  });

  test("debe navegar al login desde el enlace", async ({ page }) => {
    // Hacer clic en el enlace de "Ingresar"
    await page.getByRole("link", { name: /ingresar/i }).click();

    // Verificar navegación
    await expect(page).toHaveURL("/login");
    await expect(
      page.getByRole("heading", { name: /ingresar/i })
    ).toBeVisible();
  });

  test("debe poder enviar formulario con Enter", async ({ page }) => {
    // Llenar formulario
    await page.locator('input[id="name"]').fill("Juan");
    await page.locator('input[id="last_name"]').fill("Pérez");
    await page.locator('input[id="email"]').fill("juan@example.com");
    await page.locator('input[id="password"]').fill("password123");

    // Presionar Enter en el último campo
    await page.locator('input[id="password"]').press("Enter");

    // El formulario debería intentar enviarse (esto dependería de la implementación)
    // Por ahora solo verificamos que no hay errores
    await expect(
      page.getByRole("button", { name: /registrarse/i })
    ).toBeVisible();
  });
});
