import "@testing-library/jest-dom";
import { vi } from "vitest";

// Asegurarse de que fetch existe
if (!globalThis.fetch) {
  globalThis.fetch = vi.fn();
}

// Mock de URL global si alguna librería lo requiere
if (!globalThis.URL) {
  globalThis.URL = class {
    href: string;
    constructor(url: string) {
      this.href = url;
    }
  };
}

// Mock de otras APIs de navegador si es necesario
if (!globalThis.Headers) {
  globalThis.Headers = class {};
}
if (!globalThis.Request) {
  globalThis.Request = class {};
}
if (!globalThis.Response) {
  globalThis.Response = class {};
}
