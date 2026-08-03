import fs from "node:fs";

function resolvePath(base: string, target: string): string {
  const normalizedBase = base.replace(/\\/g, "/");
  const normalizedTarget = target.replace(/\\/g, "/");

  if (!normalizedBase || normalizedTarget.startsWith("/")) {
    return normalizedTarget;
  }

  return `${normalizedBase.replace(/\/$/, "")}/${normalizedTarget.replace(/^\//, "")}`;
}

function relativePath(from: string, to: string): string {
  const fromSegments = from.split("/").filter(Boolean);
  const toSegments = to.split("/").filter(Boolean);
  const shared = Math.min(fromSegments.length, toSegments.length);
  let overlap = 0;

  while (overlap < shared && fromSegments[overlap] === toSegments[overlap]) {
    overlap += 1;
  }

  const up = fromSegments.slice(overlap).map(() => "..").join("/");
  const down = toSegments.slice(overlap).join("/");

  if (!up && !down) {
    return ".";
  }

  return [up, down].filter(Boolean).join("/");
}

function normalizePath(input: string): string {
  const normalized = input.replace(/\\/g, "/");
  const hasLeadingSlash = normalized.startsWith("/");
  const segments = normalized
    .split("/")
    .filter((segment) => segment !== "" && segment !== ".");

  if (segments.length === 0) {
    return hasLeadingSlash ? "/" : ".";
  }

  const joined = segments.join("/");
  return hasLeadingSlash ? `/${joined}` : joined;
}

export type RepositoryDocument = {
  id: string;
  title: string;
  source: string;
  sourcePath: string;
  text: string;
  score: number;
  section: string;
  fragment: string;
  reason: string;
};

export class RepositoryKnowledgeService {
  private readonly unavailableReason: string | null;

  constructor(
    private readonly projectRoot: string | null,
    options: { unavailableReason?: string } = {},
  ) {
    this.unavailableReason = options.unavailableReason ?? null;
  }

  isAvailable(): boolean {
    return typeof this.projectRoot === "string" && this.projectRoot.trim().length > 0;
  }

  getUnavailableReason(): string | null {
    return this.unavailableReason;
  }

  search(question: string): RepositoryDocument[] {
    if (!this.isAvailable()) {
      return [];
    }

    const root = normalizePath(this.projectRoot as string);
    const keywords = question
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);

    try {
      const markdownFiles = this.findMarkdownFiles(root);

      const scored = markdownFiles
        .map((file) => {
          const text = fs.readFileSync(file, "utf8");
          const title = this.extractTitle(text);
          const sourcePath = this.normalizeRepositoryPath(relativePath(root, file));
          const source = sourcePath;
          const lowerSource = sourcePath.toLowerCase();

          if (!this.isEligible(sourcePath, text)) {
            return null;
          }

          const heading = this.extractPrimaryHeading(text);
          const fragment = this.extractRelevantFragment(text, keywords);
          const haystack = `${title} ${heading} ${text}`.toLowerCase();

          let score = 0;
          for (const keyword of keywords) {
            if (haystack.includes(keyword)) {
              score += 1;
            }
          }

          if (haystack.includes("why") || haystack.includes("purpose") || haystack.includes("understanding")) {
            score += 1;
          }

          if (lowerSource.includes("constitution")) {
            score += 3;
          }
          if (lowerSource.includes("docs/architecture/constitution.md") || lowerSource.includes("docs/operating_model.md") || lowerSource.includes("docs/institutional_operating_model.md") || lowerSource.includes("docs/theory/readme.md") || lowerSource.includes("constitution/readme.md")) {
            score += 5;
          }
          if (lowerSource.includes("docs/architecture/constitution.md") || lowerSource.includes("docs/operating_model.md") || lowerSource.includes("docs/institutional_operating_model.md")) {
            score += 2;
          }

          const reason = this.buildReason(sourcePath, haystack, keywords);

          return {
            id: sourcePath.replace(/\//g, "-"),
            title,
            source,
            sourcePath,
            text: fragment,
            score,
            section: heading,
            fragment,
            reason,
          } satisfies RepositoryDocument;
        })
        .filter((doc): doc is RepositoryDocument => Boolean(doc))
        .sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.source.localeCompare(b.source);
        })
        .slice(0, 6);

      return scored;
    } catch (error) {
      return [];
    }
  }

  private normalizeRepositoryPath(relativePath: string): string {
    return relativePath.split(/[\\/]+/).join("/");
  }

  private findMarkdownFiles(directory: string): string[] {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const absolutePath = resolvePath(directory, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".expo") {
          continue;
        }
        files.push(...this.findMarkdownFiles(absolutePath));
        continue;
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(absolutePath);
      }
    }

    return files;
  }

  private isEligible(source: string, text: string): boolean {
    const lowerSource = source.toLowerCase();
    const lowerText = text.toLowerCase();

    if (lowerSource.includes("generated-index") || lowerSource.includes("inventory") || lowerSource.includes("headers") || lowerSource.includes("evidence") || lowerSource.includes("proof") || lowerSource.includes("review") || lowerSource.includes("validation") || lowerSource.includes("milestone") || lowerSource.includes("formation") || lowerSource.includes("professions") || lowerSource.includes("hospitality") || lowerSource.includes("healthcare") || lowerSource.includes("construction") || lowerSource.includes("retail")) {
      return false;
    }

    if (lowerSource.includes("constitution") || lowerSource.includes("docs/architecture/constitution.md") || lowerSource.includes("docs/operating_model.md") || lowerSource.includes("docs/institutional_operating_model.md") || lowerSource.includes("docs/theory/README.md") || lowerSource.includes("constitution/README.md") || lowerSource.includes("docs/architecture/README.md") || lowerSource.includes("docs/architecture/")) {
      return true;
    }

    return lowerText.includes("helping hand") && (lowerText.includes("purpose") || lowerText.includes("understanding") || lowerText.includes("constitution"));
  }

  private extractPrimaryHeading(text: string): string {
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (match) {
        return match[2].trim();
      }
    }
    return "Overview";
  }

  private extractRelevantFragment(text: string, keywords: string[]): string {
    const lines = text.split(/\r?\n/);
    const lowerLines = lines.map((line) => line.toLowerCase());

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const lowerLine = lowerLines[index];
      const hasKeyword = keywords.some((keyword) => lowerLine.includes(keyword));
      if (hasKeyword) {
        const start = Math.max(0, index - 1);
        const end = Math.min(lines.length - 1, index + 2);
        return lines.slice(start, end + 1).join(" ").trim();
      }
    }

    return this.normaliseText(text).slice(0, 320);
  }

  private buildReason(source: string, haystack: string, keywords: string[]): string {
    const matches = keywords.filter((keyword) => haystack.includes(keyword));
    if (matches.length > 0) {
      return `Matched ${matches.join(", ")}`;
    }
    return "Matched repository theme";
  }

  private extractTitle(text: string): string {
    const firstLine = text.split(/\r?\n/).find((line) => line.trim().startsWith("#"));
    return firstLine ? firstLine.replace(/^#+\s*/, "").trim() : "Untitled";
  }

  private normaliseText(text: string): string {
    return text
      .replace(/```[\s\S]*?```/g, "")
      .replace(/[#>*_`-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1800);
  }
}
