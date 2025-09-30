/* eslint-disable */
// @ts-nocheck
import "@testing-library/jest-dom";
import { vi } from "vitest";

if (!globalThis.fetch) {
  globalThis.fetch = vi.fn();
}

if (!globalThis.URL) {
  globalThis.URL = class {
    href: string;
    constructor(url: string) {
      this.href = url;
    }
  };
}

if (!globalThis.Headers) {
  globalThis.Headers = class {};
}
if (!globalThis.Request) {
  globalThis.Request = class {};
}
if (!globalThis.Response) {
  globalThis.Response = class {};
}
