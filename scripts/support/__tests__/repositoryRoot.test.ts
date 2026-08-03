import { describe, expect, it } from "@jest/globals";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveRepositoryRootFromDirectory } from "../repositoryRoot";

describe("script repository root resolution", () => {
  it("resolves the workspace root from a nested script directory", () => {
    const scriptsTestDirectory = path.resolve(__dirname);

    expect(resolveRepositoryRootFromDirectory(scriptsTestDirectory)).toBe(
      path.resolve(__dirname, "../../.."),
    );
  });

  it("resolves a temporary repository root independently of the current working directory", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "repo-root-helper-"));
    const nestedDirectory = path.join(tempRoot, "scripts", "academy");

    fs.mkdirSync(nestedDirectory, { recursive: true });
    fs.writeFileSync(path.join(tempRoot, "package.json"), "{}\n", "utf8");
    fs.writeFileSync(path.join(tempRoot, "app.json"), "{}\n", "utf8");

    const previousCwd = process.cwd();
    process.chdir(os.tmpdir());

    try {
      expect(resolveRepositoryRootFromDirectory(nestedDirectory)).toBe(tempRoot);
    } finally {
      process.chdir(previousCwd);
    }
  });
});