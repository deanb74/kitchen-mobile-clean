import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findRepositoryRoot(startDirectory: string): string {
  let currentDirectory = path.resolve(startDirectory);

  while (true) {
    const packageJsonPath = path.join(currentDirectory, "package.json");
    const appJsonPath = path.join(currentDirectory, "app.json");

    if (fs.existsSync(packageJsonPath) && fs.existsSync(appJsonPath)) {
      return currentDirectory;
    }

    const parentDirectory = path.dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      throw new Error(
        `Unable to resolve repository root from ${startDirectory}. Expected an ancestor containing package.json and app.json.`,
      );
    }

    currentDirectory = parentDirectory;
  }
}

export function resolveRepositoryRootFromDirectory(startDirectory: string): string {
  return findRepositoryRoot(startDirectory);
}

export function resolveRepositoryRootFromImportMeta(importMetaUrl: string): string {
  return resolveRepositoryRootFromDirectory(path.dirname(fileURLToPath(importMetaUrl)));
}