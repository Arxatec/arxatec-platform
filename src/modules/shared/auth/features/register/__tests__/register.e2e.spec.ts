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

  test.describe("Validaciones de formulario", () => {
    test("debe mostrar errores de validación para campos vacíos", async ({
      page,
    }) => {
      // Intentar enviar formulario vacío
      await page.getByRole("button", { name: /registrarse/i }).click();

      // Verificar mensajes de error
      await expect(page.getByText("El nombre es requerido")).toBeVisible();
      await expect(page.getByText("El apellido es requerido")).toBeVisible();
      await expect(
        page.getByText("El correo electrónico no es válido")
      ).toBeVisible();
      await expect(
        page.getByText("La contraseña debe tener al menos 8 caracteres").first()
      ).toBeVisible();
    });

    test("debe mostrar error para contraseña muy corta", async ({ page }) => {
      await page.locator('input[name="password"]').fill("123");
      await page.getByRole("button", { name: /registrarse/i }).click();

      await expect(
        page.getByText("La contraseña debe tener al menos 8 caracteres").first()
      ).toBeVisible();
    });

    test("debe mostrar error cuando las contraseñas no coinciden", async ({
      page,
    }) => {
      await page.locator('input[name="password"]').fill("password123");
      await page.locator('input[name="confirm_password"]').fill("password456");
      await page.getByRole("button", { name: /registrarse/i }).click();

      await expect(
        page.getByText("Las contraseñas no coinciden")
      ).toBeVisible();
    });

    test("no debe mostrar errores cuando todos los campos son válidos", async ({
      page,
    }) => {
      // Llenar todos los campos correctamente
      await page.locator('input[name="first_name"]').fill("Juan");
      await page.locator('input[name="last_name"]').fill("Pérez");
      await page.locator('input[name="email"]').fill("juan@example.com");
      await page.locator('input[name="password"]').fill("password123");
      await page.locator('input[name="confirm_password"]').fill("password123");

      // Los errores de validación no deberían estar visibles
      await expect(page.getByText("El nombre es requerido")).not.toBeVisible();
      await expect(
        page.getByText("El apellido es requerido")
      ).not.toBeVisible();
      await expect(
        page.getByText("El correo electrónico no es válido")
      ).not.toBeVisible();
      await expect(
        page.getByText("Las contraseñas no coinciden")
      ).not.toBeVisible();
    });
  });

  test.describe("Manejo de respuestas del servidor", () => {
    test("debe mostrar mensaje de éxito y redirigir después de registro exitoso", async ({
      page,
    }) => {
      // Mock de respuesta exitosa del servidor
      await page.route("**/auth/register/request", async (route) => {
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
      await page.locator('input[name="first_name"]').fill("Juan");
      await page.locator('input[name="last_name"]').fill("Pérez");
      await page.locator('input[name="email"]').fill("juan@example.com");
      await page.locator('input[name="password"]').fill("password123");
      await page.locator('input[name="confirm_password"]').fill("password123");

      // Enviar formulario
      await page.getByRole("button", { name: /registrarse/i }).click();

      // Verificar mensaje de éxito (usando sonner toast)
      await expect(
        page.getByText("Usuario registrado correctamente")
      ).toBeVisible();
      await expect(
        page.getByText(
          "Por favor, verifica tu correo electrónico para activar tu cuenta."
        )
      ).toBeVisible();

      // Verificar redirección a verify-account
      await expect(page).toHaveURL("/verify-account");
    });

    test("debe mostrar estado de carga durante el envío", async ({ page }) => {
      // Mock de respuesta lenta del servidor
      await page.route("**/auth/register/request", async (route) => {
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
      await page.locator('input[name="first_name"]').fill("Juan");
      await page.locator('input[name="last_name"]').fill("Pérez");
      await page.locator('input[name="email"]').fill("juan@example.com");
      await page.locator('input[name="password"]').fill("password123");
      await page.locator('input[name="confirm_password"]').fill("password123");

      // Enviar formulario
      await page.getByRole("button", { name: /registrarse/i }).click();

      // Verificar estado de carga
      await expect(page.getByText("Registrando...")).toBeVisible();
      await expect(page.locator(".animate-spin")).toBeVisible(); // Spinner
      await expect(
        page.getByRole("button", { name: /registrando/i })
      ).toBeDisabled();
    });
  });

  test("debe poder enviar formulario con Enter", async ({ page }) => {
    // Mock de respuesta exitosa
    await page.route("**/auth/register/request", async (route) => {
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
    await page.locator('input[name="first_name"]').fill("Juan");
    await page.locator('input[name="last_name"]').fill("Pérez");
    await page.locator('input[name="email"]').fill("juan@example.com");
    await page.locator('input[name="password"]').fill("password123");
    await page.locator('input[name="confirm_password"]').fill("password123");

    // Presionar Enter en el último campo
    await page.locator('input[name="confirm_password"]').press("Enter");

    // Verificar que el formulario se envía
    await expect(
      page.getByText("Usuario registrado correctamente")
    ).toBeVisible();
  });
});
