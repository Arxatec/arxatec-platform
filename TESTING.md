# Guía de Testing - Arxatec Platform

Esta guía explica cómo ejecutar y escribir tests en el proyecto Arxatec Platform siguiendo nuestra arquitectura de features.

## 📋 Tabla de Contenidos

- [Configuración](#configuración)
- [Arquitectura de Tests](#arquitectura-de-tests)
- [Tests Unitarios](#tests-unitarios)
- [Tests E2E](#tests-e2e)
- [Ejecutar Tests](#ejecutar-tests)
- [Estructura de Archivos](#estructura-de-archivos)
- [Mejores Prácticas](#mejores-prácticas)
- [CI/CD](#cicd)

## 🛠️ Configuración

El proyecto está configurado con dos tipos principales de testing:

### Tests Unitarios y de Componentes

- **Vitest**: Framework de testing rápido y moderno
- **React Testing Library**: Para testing de componentes React
- **Jest DOM**: Matchers adicionales para DOM testing

### Tests End-to-End (E2E)

- **Playwright**: Framework para testing E2E con soporte para múltiples navegadores
- **Chromium**: Navegador configurado para los tests

## 🏗️ Arquitectura de Tests

Seguimos una arquitectura **co-ubicada** y **por features** para mantener los tests cerca del código que prueban:

### 1. Tests por Features

Cada feature tiene su propia carpeta `__tests__/` con tests unitarios y E2E:

```
src/modules/shared/auth/features/
├── register/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── __tests__/              # 👈 Tests de la feature
│       ├── unit/
│       │   ├── components/     # Tests de componentes
│       │   ├── services/       # Tests de servicios
│       │   └── pages/          # Tests de páginas
│       └── e2e/
│           └── register.spec.ts # Tests E2E
```

### 2. Tests Co-ubicados para Componentes UI

Los componentes UI tienen tests junto al código:

```
src/components/ui/
├── button/
│   ├── index.tsx
│   └── button.test.tsx         # 👈 Test co-ubicado
├── input/
│   ├── index.tsx
│   └── input.test.tsx          # 👈 Test co-ubicado
```

### 3. Tests de Stores

Los stores de Zustand tienen sus tests co-ubicados:

```
src/store/
└── user/
    ├── index.ts
    └── __tests__/
        └── user-store.test.ts  # 👈 Test del store
```

## 🧪 Tests Unitarios

### Ejecutar Tests Unitarios

```bash
# Ejecutar todos los tests unitarios una vez
npm run test:unit

# Ejecutar en modo watch (se re-ejecutan al cambiar archivos)
npm run test:unit:watch

# Ejecutar con coverage
npm run test:unit -- --coverage
```

### Ejemplos de Tests Unitarios

#### Test de Componente UI (Co-ubicado)

```typescript
// src/components/ui/button/button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("debe renderizar correctamente", () => {
    render(<Button>Haz clic</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("debe manejar eventos de clic", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clic</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Test de Servicio de Feature

```typescript
// src/modules/shared/auth/features/register/__tests__/unit/services/register.test.ts
import { describe, it, expect, vi } from "vitest";
import { register } from "../../../services";
import { axiosInstance } from "@/interceptors";

vi.mock("@/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("Register Service", () => {
  it("debe llamar al endpoint correcto", async () => {
    const mockRequest = {
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan@example.com",
      password: "password123",
    };

    (axiosInstance.post as any).mockResolvedValue({
      data: { data: mockRequest },
    });

    await register(mockRequest);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/users/register",
      mockRequest
    );
  });
});
```

#### Test de Store de Zustand

```typescript
// src/store/user/__tests__/user-store.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "../index";

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.getState().deleteUser();
  });

  it("debe establecer un usuario correctamente", () => {
    const mockUser = { id: "1", name: "Test User" };

    useUserStore.getState().setUser(mockUser);

    expect(useUserStore.getState().user).toEqual(mockUser);
  });
});
```

## 🌐 Tests E2E

Los tests E2E están organizados por features y cubren flujos completos de usuario.

### Ejecutar Tests E2E

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar en modo headed (con interfaz gráfica)
npx playwright test --headed

# Ejecutar tests de una feature específica
npx playwright test src/modules/shared/auth/features/register/__tests__/e2e/

# Ejecutar en modo debug
npx playwright test --debug
```

### Ejemplo de Test E2E por Feature

```typescript
// src/modules/shared/auth/features/register/__tests__/e2e/register.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Register Feature E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("debe completar el flujo de registro", async ({ page }) => {
    // Llenar formulario
    await page.locator('input[id="name"]').fill("Juan");
    await page.locator('input[id="last_name"]').fill("Pérez");
    await page.locator('input[id="email"]').fill("juan@example.com");
    await page.locator('input[id="password"]').fill("password123");

    // Verificar valores
    await expect(page.locator('input[id="name"]')).toHaveValue("Juan");
    await expect(page.locator('input[id="email"]')).toHaveValue(
      "juan@example.com"
    );

    // Enviar formulario
    await page.getByRole("button", { name: /registrarse/i }).click();
  });
});
```

## 📁 Estructura de Archivos

```
src/
├── components/ui/                    # Componentes UI
│   ├── button/
│   │   ├── index.tsx
│   │   └── button.test.tsx          # ✅ Test co-ubicado
│   ├── input/
│   │   ├── index.tsx
│   │   └── input.test.tsx           # ✅ Test co-ubicado
│   └── label/
│       ├── index.tsx
│       └── label.test.tsx           # ✅ Test co-ubicado
│
├── modules/shared/auth/features/     # Features de autenticación
│   ├── register/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── __tests__/               # ✅ Tests de feature
│   │       ├── unit/
│   │       │   ├── components/      # Tests de componentes
│   │       │   ├── services/        # Tests de servicios
│   │       │   └── pages/           # Tests de páginas
│   │       └── e2e/
│   │           └── register.spec.ts # Tests E2E
│   └── login/
│       └── __tests__/               # ✅ Tests de feature
│           └── e2e/
│               └── login.spec.ts
│
├── store/                           # Stores de Zustand
│   └── user/
│       ├── index.ts
│       └── __tests__/               # ✅ Tests de store
│           └── user-store.test.ts
│
└── tests/
    └── setup.ts                     # Configuración global

# Configuración
├── playwright.config.ts             # Config Playwright
└── vite.config.ts                   # Config Vitest
```

## ✅ Mejores Prácticas

### Tests Unitarios

1. **Co-ubicación**: Mantén tests cerca del código que prueban
2. **Descriptivos**: Nombres claros en español que expliquen qué se prueba
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mocks**: Usar mocks para dependencias externas
5. **Aislamiento**: Cada test debe ser independiente

```typescript
// ✅ Bueno - Test co-ubicado y descriptivo
describe("RegisterForm", () => {
  beforeEach(() => {
    // Limpiar estado antes de cada test
  });

  it("debe validar email con formato correcto", () => {
    // Arrange
    render(<Form />, { wrapper: RouterWrapper });
    const emailInput = screen.getByLabelText(/correo/i);

    // Act
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Assert
    expect(emailInput).toBeInvalid();
  });
});
```

### Tests E2E

1. **Por Features**: Organizar tests por funcionalidad
2. **Selectores estables**: Usar `getByRole`, `getByLabelText`, etc.
3. **Esperas explícitas**: Usar `await expect().toBeVisible()`
4. **Datos realistas**: Usar datos que simulen uso real
5. **Flujos completos**: Probar escenarios de usuario completos

```typescript
// ✅ Bueno - Test E2E por feature
test.describe("Login Feature E2E", () => {
  test("debe completar el flujo de login exitoso", async ({ page }) => {
    await page.goto("/login");

    // Llenar credenciales
    await page.locator('input[type="email"]').fill("usuario@ejemplo.com");
    await page.locator('input[type="password"]').fill("password123");

    // Enviar formulario
    await page.getByRole("button", { name: /ingresar/i }).click();

    // Verificar redirección exitosa
    await expect(page).toHaveURL("/dashboard");
  });
});
```

### Organización por Features

1. **Separación clara**: Unit tests y E2E tests en carpetas separadas
2. **Tests específicos**: Cada feature tiene sus propios tests
3. **Reutilización**: Compartir utilities de testing cuando sea apropiado
4. **Mantenimiento**: Tests fáciles de encontrar y mantener

## 🔄 CI/CD

Los tests se ejecutan automáticamente en GitHub Actions:

- **Push/PR a main/develop**: Ejecuta todos los tests
- **Tests unitarios**: Se ejecutan en paralelo con lint y build
- **Tests E2E**: Se ejecutan con Playwright en Ubuntu
- **Artefactos**: Se guardan reportes de coverage y Playwright

### Workflow de CI

```yaml
# .github/workflows/tests.yml
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:unit

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install chromium
      - run: npm run test:e2e
```

## 🚀 Comandos Rápidos

```bash
# Desarrollo
npm run test:unit:watch              # Tests unitarios en modo watch
npx playwright test --ui             # Interfaz web de Playwright

# Tests específicos por feature
npm run test:unit src/modules/shared/auth/features/register/
npx playwright test src/modules/shared/auth/features/login/

# CI/Producción
npm run test:unit                    # Todos los tests unitarios
npm run test:e2e                     # Todos los tests E2E

# Debugging
npx playwright test --debug          # Debug tests E2E
npm run test:unit -- --reporter=verbose  # Tests unitarios verbose
```

## 📊 Coverage y Reportes

- **Unit tests**: Coverage automático con Vitest
- **E2E tests**: Reportes HTML con Playwright
- **CI**: Artefactos guardados en GitHub Actions

Para ver reportes localmente:

```bash
# Coverage unitario
npm run test:unit -- --coverage

# Reporte E2E
npx playwright show-report
```

## 🆘 Solución de Problemas

### Tests unitarios fallan

- Verificar imports y paths con `@/`
- Revisar setup en `src/tests/setup.ts`
- Limpiar cache: `npm run test:unit -- --run`
- Verificar mocks en tests de features

### Tests E2E fallan

- Verificar que el servidor dev esté corriendo
- Revisar selectores en los tests
- Usar modo debug: `npx playwright test --debug`
- Verificar rutas y navegación

### CI falla

- Revisar logs en GitHub Actions
- Verificar que todas las dependencias estén en `package.json`
- Comprobar que los tests pasan localmente

## 📝 Convenciones de Naming

### Archivos de Test

- **Componentes UI**: `ComponentName.test.tsx`
- **Services**: `service-name.test.ts`
- **Pages**: `page-name.test.tsx`
- **Stores**: `store-name.test.ts`
- **E2E**: `feature-name.spec.ts`

### Descripciones de Test

```typescript
// ✅ Bueno - Descripciones claras en español
describe("RegisterForm", () => {
  it("debe mostrar error cuando el email es inválido", () => {});
  it("debe enviar datos correctamente al hacer submit", () => {});
  it("debe navegar a login después de registro exitoso", () => {});
});

test.describe("Register Feature E2E", () => {
  test("debe completar el flujo de registro correctamente", async () => {});
  test("debe mostrar errores de validación apropiados", async () => {});
});
```

---

## 🎯 Resumen

**Ventajas de esta arquitectura:**

✅ **Co-ubicación**: Tests cerca del código que prueban  
✅ **Organización por features**: Fácil mantenimiento y escalabilidad  
✅ **Separación clara**: Unit tests vs E2E tests bien organizados  
✅ **Reutilización**: Componentes UI testeados independientemente  
✅ **Mantenimiento**: Fácil encontrar y actualizar tests

¿Tienes preguntas sobre testing? Consulta la documentación oficial de [Vitest](https://vitest.dev/) y [Playwright](https://playwright.dev/).
