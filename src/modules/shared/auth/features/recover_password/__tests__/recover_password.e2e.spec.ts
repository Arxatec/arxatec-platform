import { test, expect } from "@playwright/test";

test.describe("Recover Password Feature E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/recover-password");
  });

  test("debe cargar la página de recuperación de contraseña correctamente", async ({
    page,
  }) => {
    await expect(page).toHaveURL("/recover-password");
    await expect(page).toHaveTitle(/Recuperar contraseña - Arxatec/i);
    await expect(
      page.getByRole("heading", { name: /recuperar contraseña/i })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Ingresa tu correo electrónico para recuperar tu contraseña"
      )
    ).toBeVisible();
  });

  test("debe navegar al login desde el enlace", async ({ page }) => {
    // Hacer clic en el enlace de "Volver atrás"
    await page.getByRole("link", { name: /volver atrás/i }).click();

    // Verificar navegación
    await expect(page).toHaveURL("/login");
    await expect(
      page.getByRole("heading", { name: /ingresar/i })
    ).toBeVisible();
  });

  test.describe("Validaciones de formulario", () => {
    test("debe mostrar error de validación para campo vacío", async ({
      page,
    }) => {
      // Intentar enviar formulario vacío
      await page.getByRole("button", { name: /recuperar contraseña/i }).click();

      // Verificar mensaje de error
      await expect(
        page.getByText("El correo electrónico no es válido")
      ).toBeVisible();
    });

    test("debe mostrar error para email inválido", async ({ page }) => {
      await page.locator('input[name="email"]').fill("");

      await page.getByRole("button", { name: /recuperar contraseña/i }).click();

      await expect(
        page.getByText("El correo electrónico no es válido")
      ).toBeVisible();
    });

    test("no debe mostrar errores cuando el email es válido", async ({
      page,
    }) => {
      // Llenar campo correctamente
      await page.locator('input[name="email"]').fill("juan@example.com");

      // El error de validación no debería estar visible
      await expect(
        page.getByText("El correo electrónico no es válido")
      ).not.toBeVisible();
    });
  });

  test.describe("Manejo de respuestas del servidor", () => {
    test("debe mostrar mensaje de éxito y redirigir después de envío exitoso", async ({
      page,
    }) => {
      // Mock de respuesta exitosa del servidor
      await page.route("**/auth/password-reset/request", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: 200,
            message: "OK",
            description: "Código de verificación enviado correctamente.",
            timestamp: "2025-09-29T02:18:02.800Z",
            path: "/request",
          }),
        });
      });

      // Llenar formulario válido
      await page.locator('input[name="email"]').fill("juan@example.com");

      // Enviar formulario
      await page.getByRole("button", { name: /recuperar contraseña/i }).click();

      // Verificar mensaje de éxito (usando sonner toast)
      await expect(
        page.getByText("Recuperación de contraseña exitosa")
      ).toBeVisible();
      await expect(
        page.getByText("Hemos enviado un código para recuperar tu contraseña")
      ).toBeVisible();

      // Verificar redirección a verify-password-reset
      await expect(page).toHaveURL("/verify-password-reset");
    });

    test("debe mostrar estado de carga durante el envío", async ({ page }) => {
      // Mock de respuesta lenta del servidor
      await page.route("**/auth/password-reset/request", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: 200,
            message: "OK",
            description: "Código de verificación enviado correctamente.",
            timestamp: "2025-09-29T02:18:02.800Z",
            path: "/request",
          }),
        });
      });

      // Llenar formulario válido
      await page.locator('input[name="email"]').fill("juan@example.com");

      // Enviar formulario
      await page.getByRole("button", { name: /recuperar contraseña/i }).click();

      // Verificar estado de carga
      await expect(page.getByText("Recuperando...")).toBeVisible();
      await expect(page.locator(".animate-spin")).toBeVisible(); // Spinner
      await expect(
        page.getByRole("button", { name: /recuperando/i })
      ).toBeDisabled();
    });
  });

  test("debe poder enviar formulario con Enter", async ({ page }) => {
    // Mock de respuesta exitosa
    await page.route("**/auth/password-reset/request", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: 200,
          message: "OK",
          description: "Código de verificación enviado correctamente.",
          timestamp: "2025-09-29T02:18:02.800Z",
          path: "/request",
        }),
      });
    });

    // Llenar formulario válido
    await page.locator('input[name="email"]').fill("juan@example.com");

    // Presionar Enter en el campo
    await page.locator('input[name="email"]').press("Enter");

    // Verificar que el formulario se envía
    await expect(
      page.getByText("Recuperación de contraseña exitosa")
    ).toBeVisible();
  });
});
