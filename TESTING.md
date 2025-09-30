# Testing Guide – Arxatec Platform

This guide explains how to write and run tests in the Arxatec Platform project following our feature-based architecture.

## 📋 Table of Contents

- [Setup](#setup)
- [Test Architecture](#test-architecture)
- [Unit Tests](#unit-tests)
- [E2E Tests](#e2e-tests)
- [Running Tests](#running-tests)
- [File Structure](#file-structure)
- [Best Practices](#best-practices)
- [CI/CD](#cicd)

## 🛠️ Setup

The project is configured with two main types of testing:

### Unit and Component Tests

- **Vitest**: Fast and modern testing framework
- **React Testing Library**: For testing React components
- **Jest DOM**: Additional matchers for DOM testing

### End-to-End (E2E) Tests

- **Playwright**: E2E testing framework with multi-browser support
- **Chromium**: Configured browser for tests

## 🏗️ Test Architecture

We follow a **co-located** and **feature-based** architecture to keep tests close to the code they cover:

### 1. Feature-Based Tests

Each feature has its own `__tests__/` folder with unit and E2E tests:

```
src/modules/shared/auth/features/
├── register/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── __tests__/
│       ├── unit/
│       │   ├── components/
│       │   ├── services/
│       │   └── pages/
│       └── e2e/
│           └── register.spec.ts
```

### 2. Co-located Tests for UI Components

UI components have their tests next to the code:

```
src/components/ui/
├── button/
│   ├── index.tsx
│   └── button.test.tsx
├── input/
│   ├── index.tsx
│   └── input.test.tsx
```

### 3. Store Tests

Zustand stores have co-located tests:

```
src/store/
└── user/
    ├── index.ts
    └── __tests__/
        └── user-store.test.ts
```

## 🧪 Unit Tests

### Running Unit Tests

```bash
# Run all unit tests once
npm run test:unit

# Run in watch mode (reruns on file changes)
npm run test:unit:watch

# Run with coverage
npm run test:unit -- --coverage
```

### Unit Test Examples

#### UI Component Test (Co-located)

```typescript
// src/components/ui/button/button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Feature Service Test

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
  it("should call the correct endpoint", async () => {
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

#### Zustand Store Test

```typescript
// src/store/user/__tests__/user-store.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "../index";

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.getState().deleteUser();
  });

  it("should set a user correctly", () => {
    const mockUser = { id: "1", name: "Test User" };

    useUserStore.getState().setUser(mockUser);

    expect(useUserStore.getState().user).toEqual(mockUser);
  });
});
```

## 🌐 E2E Tests

E2E tests are organized by feature and cover complete user flows.

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (with GUI)
npx playwright test --headed

# Run tests for a specific feature
npx playwright test src/modules/shared/auth/features/register/__tests__/e2e/

# Run in debug mode
npx playwright test --debug
```

### Example of Feature E2E Test

```typescript
// src/modules/shared/auth/features/register/__tests__/e2e/register.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Register Feature E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("should complete the registration flow", async ({ page }) => {
    // Fill form
    await page.locator('input[id="name"]').fill("Juan");
    await page.locator('input[id="last_name"]').fill("Pérez");
    await page.locator('input[id="email"]').fill("juan@example.com");
    await page.locator('input[id="password"]').fill("password123");

    // Verify values
    await expect(page.locator('input[id="name"]')).toHaveValue("Juan");
    await expect(page.locator('input[id="email"]')).toHaveValue(
      "juan@example.com"
    );

    // Submit form
    await page.getByRole("button", { name: /register/i }).click();
  });
});
```

## 📁 File Structure

```
src/
├── components/ui/
│   ├── button/
│   │   ├── index.tsx
│   │   └── button.test.tsx
│   ├── input/
│   │   ├── index.tsx
│   │   └── input.test.tsx
│   └── label/
│       ├── index.tsx
│       └── label.test.tsx
│
├── modules/shared/auth/features/
│   ├── register/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── __tests__/
│   │       ├── unit/
│   │       │   ├── components/
│   │       │   ├── services/
│   │       │   └── pages/
│   │       └── e2e/
│   │           └── register.spec.ts
│   └── login/
│       └── __tests__/
│           └── e2e/
│               └── login.spec.ts
│
├── store/
│   └── user/
│       ├── index.ts
│       └── __tests__/
│           └── user-store.test.ts
│
└── tests/
    └── setup.ts

# Config
├── playwright.config.ts
└── vite.config.ts
```

## ✅ Best Practices

### Unit Tests

1. **Co-location**: Keep tests close to the code
2. **Descriptive**: Clear names explaining what is tested
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mocks**: Use mocks for external dependencies
5. **Isolation**: Each test must be independent

```typescript
// ✅ Good - Co-located, descriptive test
describe("RegisterForm", () => {
  beforeEach(() => {
    // Reset state before each test
  });

  it("should validate email format correctly", () => {
    // Arrange
    render(<Form />, { wrapper: RouterWrapper });
    const emailInput = screen.getByLabelText(/email/i);

    // Act
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Assert
    expect(emailInput).toBeInvalid();
  });
});
```

### E2E Tests

1. **Feature-based**: Organize tests by functionality
2. **Stable selectors**: Use `getByRole`, `getByLabelText`, etc.
3. **Explicit waits**: `await expect().toBeVisible()`
4. **Realistic data**: Use data simulating real usage
5. **Complete flows**: Test full user scenarios

```typescript
// ✅ Good - E2E test by feature
test.describe("Login Feature E2E", () => {
  test("should complete a successful login flow", async ({ page }) => {
    await page.goto("/login");

    // Fill credentials
    await page.locator('input[type="email"]').fill("user@example.com");
    await page.locator('input[type="password"]').fill("password123");

    // Submit form
    await page.getByRole("button", { name: /login/i }).click();

    // Verify successful redirection
    await expect(page).toHaveURL("/dashboard");
  });
});
```

### Feature Organization

1. **Clear separation**: Unit tests vs E2E tests in separate folders
2. **Specific tests**: Each feature has its own tests
3. **Reusability**: Share testing utilities when appropriate
4. **Maintainability**: Tests are easy to find and maintain

## 🔄 CI/CD

Tests are automatically executed in GitHub Actions:

- **Push/PR to main/develop**: Run all tests
- **Unit tests**: Run in parallel with lint and build
- **E2E tests**: Run with Playwright on Ubuntu
- **Artifacts**: Coverage and Playwright reports are saved

### CI Workflow

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

## 🚀 Quick Commands

```bash
# Development
npm run test:unit:watch              # Unit tests in watch mode
npx playwright test --ui             # Playwright web interface

# Feature-specific tests
npm run test:unit src/modules/shared/auth/features/register/
npx playwright test src/modules/shared/auth/features/login/

# CI/Production
npm run test:unit                    # All unit tests
npm run test:e2e                     # All E2E tests

# Debugging
npx playwright test --debug          # Debug E2E tests
npm run test:unit -- --reporter=verbose  # Verbose unit tests
```

## 📊 Coverage and Reports

- **Unit tests**: Automatic coverage with Vitest
- **E2E tests**: HTML reports with Playwright
- **CI**: Artifacts saved in GitHub Actions

Local reports:

```bash
# Unit test coverage
npm run test:unit -- --coverage

# E2E report
npx playwright show-report
```

## 🆘 Troubleshooting

### Unit Tests Fail

- Check imports and `@/` paths
- Verify setup in `src/tests/setup.ts`
- Clear cache: `npm run test:unit -- --run`
- Check mocks in feature tests

### E2E Tests Fail

- Ensure dev server is running
- Check selectors in tests
- Use debug mode: `npx playwright test --debug`
- Verify routes and navigation

### CI Fails

- Check GitHub Actions logs
- Verify all dependencies in `package.json`
- Ensure tests pass locally

## 📝 Naming Conventions

### Test Files

- **UI Components**: `ComponentName.test.tsx`
- **Services**: `service-name.test.ts`
- **Pages**: `page-name.test.tsx`
- **Stores**: `store-name.test.ts`
- **E2E**: `feature-name.spec.ts`

### Test Descriptions

```typescript
// ✅ Good - Clear descriptions in English
describe("RegisterForm", () => {
  it("should show error when email is invalid", () => {});
  it("should submit data correctly", () => {});
  it("should navigate to login after successful registration", () => {});
});

test.describe("Register Feature E2E", () => {
  test("should complete the registration flow correctly", async () => {});
  test("should show appropriate validation errors", async () => {});
});
```

---

## 🎯 Summary

**Benefits of this architecture:**

✅ **Co-location**: Tests close to the code
✅ **Feature-based organization**: Easy maintenance and scalability
✅ **Clear separation**: Unit vs E2E tests organized
✅ **Reusability**: UI components tested independently
✅ **Maintainability**: Easy to find and update tests

For more information, refer to the official documentation of [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/).
