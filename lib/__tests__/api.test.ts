import { describe, expect, it } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";

describe("API base URL configuration", () => {
  const loadApiModule = () => {
    jest.resetModules();
    return require("../api") as typeof import("../api");
  };

  it("accepts a valid configured URL", () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = "https://api.example.com/base";

    const api = loadApiModule();

    expect(api.resolveApiBaseUrl()).toBe("https://api.example.com/base");
  });

  it("normalizes trailing slashes", () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = "http://example.test:3001///";

    const api = loadApiModule();

    expect(api.resolveApiBaseUrl()).toBe("http://example.test:3001");
  });

  it("fails clearly when configuration is missing", () => {
    delete process.env.EXPO_PUBLIC_API_BASE_URL;

    expect(() => loadApiModule()).toThrow(
      "EXPO_PUBLIC_API_BASE_URL must be configured as a non-empty HTTP or HTTPS URL.",
    );
  });

  it("fails clearly when configuration is invalid", () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = "not-a-url";

    expect(() => loadApiModule()).toThrow(
      "EXPO_PUBLIC_API_BASE_URL must be a valid HTTP or HTTPS URL.",
    );
  });

  it("does not leave the old LAN IP in executable source", () => {
    const root = path.resolve(__dirname, "../..");
    const sourceRoots = ["app", "lib", "scripts", "src"];
    const oldLanIp = "192.168.0.182";
    const visitedFiles: string[] = [];

    const visit = (directory: string) => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.name === "__tests__") {
          continue;
        }

        const absolutePath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          visit(absolutePath);
          continue;
        }

        if (!/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) {
          continue;
        }

        visitedFiles.push(absolutePath);
        const content = fs.readFileSync(absolutePath, "utf8");
        expect(content.includes(oldLanIp)).toBe(false);
      }
    };

    for (const sourceRoot of sourceRoots) {
      visit(path.join(root, sourceRoot));
    }

    expect(visitedFiles.length).toBeGreaterThan(0);
  });
});