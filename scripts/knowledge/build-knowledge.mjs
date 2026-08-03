import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function resolveProjectRoot() {
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(scriptDirectory, "../..");
}

const projectRoot = resolveProjectRoot();
const scanRoot = projectRoot;

const outputFiles = {
  inventory: path.join(projectRoot, "md_inventory.txt"),
  headers: path.join(projectRoot, "md_headers.txt"),
  helpingHandHeaders: path.join(projectRoot, "hh_headers.txt"),
  knowledgeIndex: path.join(projectRoot, "knowledge_index.md"),
};

const excludedDirectories = new Set([
  ".git",
  ".expo",
  ".next",
  ".turbo",
  ".vercel",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "android",
  "ios",
  "repo-sweep",
]);

const excludedFiles = new Set([
  "UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md",
]);

const concepts = [
  {
    name: "Academy",
    terms: ["academy", "professional academy"],
  },
  {
    name: "Annie Faffree",
    terms: [
      "annie",
      "annie faffree",
      "annie scenarios",
      "digital hospitality colleague",
    ],
  },
  {
    name: "Architecture",
    terms: ["architecture", "architectural"],
  },
  {
    name: "Character",
    terms: ["character", "character before capability"],
  },
  {
    name: "Compassion",
    terms: ["compassion", "compassionate"],
  },
  {
    name: "Companion Intelligence",
    terms: ["companion intelligence"],
  },
  {
    name: "Companion Operating System",
    terms: ["companion operating system", "cos"],
  },
  {
    name: "Companion Root System",
    terms: ["companion root system"],
  },
  {
    name: "Constitution",
    terms: ["constitution"],
  },
  {
    name: "Context",
    terms: ["context", "context engine"],
  },
  {
    name: "Curiosity",
    terms: ["curiosity", "curious"],
  },
  {
    name: "Digital Colleague",
    terms: ["digital colleague", "digital colleagues"],
  },
  {
    name: "Dignity",
    terms: ["dignity"],
  },
  {
    name: "Engineering Library",
    terms: ["engineering library"],
  },
  {
    name: "Experience",
    terms: ["experience"],
  },
  {
    name: "Forest Philosophy",
    terms: ["forest philosophy", "forest"],
  },
  {
    name: "Forest Pollination",
    terms: ["forest pollination"],
  },
  {
    name: "Formation",
    terms: ["formation", "formation programme"],
  },
  {
    name: "Graduation",
    terms: ["graduation", "graduate"],
  },
  {
    name: "Helping Hand",
    terms: ["helping hand"],
  },
  {
    name: "Honesty",
    terms: ["honesty", "honest"],
  },
  {
    name: "Humility",
    terms: ["humility", "humble"],
  },
  {
    name: "Interdependence",
    terms: ["interdependence", "interdependent"],
  },
  {
    name: "Judgement",
    terms: ["judgement", "judgment"],
  },
  {
    name: "Knowledge",
    terms: ["knowledge"],
  },
  {
    name: "Learning",
    terms: ["learning", "learn", "learner"],
  },
  {
    name: "Listening",
    terms: ["listening", "listen"],
  },
  {
    name: "Living Memory",
    terms: ["living memory"],
  },
  {
    name: "MARC",
    terms: ["marc"],
  },
  {
    name: "Mentoring",
    terms: ["mentor", "mentoring"],
  },
  {
    name: "Person",
    terms: ["person", "people", "human"],
  },
  {
    name: "People Before Technology",
    terms: ["people before technology"],
  },
  {
    name: "Philosophy",
    terms: ["philosophy", "philosophical"],
  },
  {
    name: "Professional HQ",
    terms: ["professional hq", "professional hqs"],
  },
  {
    name: "Reflection",
    terms: ["reflection", "reflect", "reflective"],
  },
  {
    name: "Research",
    terms: ["research"],
  },
  {
    name: "Respect",
    terms: ["respect", "respectful"],
  },
  {
    name: "Responsibility",
    terms: ["responsibility", "responsibilities"],
  },
  {
    name: "Teamwork",
    terms: ["teamwork", "team work"],
  },
  {
    name: "Thinking",
    terms: ["thinking", "think"],
  },
  {
    name: "Trust",
    terms: ["trust", "trustworthy"],
  },
  {
    name: "Understanding",
    terms: ["understanding", "understand"],
  },
  {
    name: "Wisdom",
    terms: ["wisdom", "wise"],
  },
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(absolutePath)));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".md") &&
      !excludedFiles.has(entry.name)
    ) {
      files.push(absolutePath);
    }
  }

  return files;
}

function normalisePath(absolutePath) {
  return path.relative(projectRoot, absolutePath).split(path.sep).join("/");
}

function extractHeadings(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);

      if (!match) {
        return null;
      }

      return {
        level: match[1].length,
        text: match[2].replace(/\s+#+$/, "").trim(),
        line: index + 1,
      };
    })
    .filter(Boolean);
}

function extractTitle(headings, filePath) {
  const primaryHeading = headings.find((heading) => heading.level === 1);

  if (primaryHeading) {
    return primaryHeading.text;
  }

  return humaniseFilename(filePath);
}

function humaniseFilename(filePath) {
  return path
    .basename(filePath, path.extname(filePath))
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function containsTerm(text, term) {
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^a-z0-9])${escapedTerm}([^a-z0-9]|$)`, "i");
  return pattern.test(text);
}

function findConceptMatches(document) {
  const searchableText = [
    document.title,
    humaniseFilename(document.absolutePath),
    document.relativePath.replace(/[-_/]+/g, " "),
    ...document.headings.map((heading) => heading.text),
    document.content,
  ].join("\n");

  return concepts
    .filter((concept) =>
      concept.terms.some((term) => containsTerm(searchableText, term)),
    )
    .map((concept) => concept.name);
}

function buildInventory(documents) {
  const lines = [
    "HELPING HAND MARKDOWN INVENTORY",
    "================================",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Documents: ${documents.length}`,
    "",
  ];

  for (const document of documents) {
    lines.push(document.relativePath);
    lines.push(`  Title: ${document.title}`);
    lines.push(`  Headings: ${document.headings.length}`);
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function buildHeaderIndex(documents) {
  const lines = [
    "HELPING HAND MARKDOWN HEADERS",
    "===============================",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  for (const document of documents) {
    lines.push(document.relativePath);

    if (document.headings.length === 0) {
      lines.push("  [No Markdown headings found]");
    } else {
      for (const heading of document.headings) {
        const indentation = "  ".repeat(heading.level);
        lines.push(
          `${indentation}${"#".repeat(heading.level)} ${heading.text} (line ${heading.line})`,
        );
      }
    }

    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function buildHelpingHandHeaderIndex(documents) {
  const lines = [
    "HELPING HAND CONCEPT HEADERS",
    "============================",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  let totalMatches = 0;

  for (const document of documents) {
    const matchingHeadings = document.headings.filter((heading) =>
      concepts.some((concept) =>
        concept.terms.some((term) => containsTerm(heading.text, term)),
      ),
    );

    if (matchingHeadings.length === 0) {
      continue;
    }

    totalMatches += matchingHeadings.length;
    lines.push(document.relativePath);

    for (const heading of matchingHeadings) {
      lines.push(
        `  ${"#".repeat(heading.level)} ${heading.text} (line ${heading.line})`,
      );
    }

    lines.push("");
  }

  if (totalMatches === 0) {
    lines.push("[No Helping Hand concept headings found]");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function buildKnowledgeIndex(documents) {
  const conceptDocuments = new Map(
    concepts.map((concept) => [concept.name, []]),
  );

  for (const document of documents) {
    for (const conceptName of document.conceptMatches) {
      conceptDocuments.get(conceptName)?.push(document);
    }
  }

  const lines = [
    "# Helping Hand Knowledge Index",
    "",
    '> *"Knowledge should not merely be stored. It should be understood."*',
    "",
    "---",
    "",
    "## Purpose",
    "",
    "This generated index connects Helping Hand concepts to the Engineering Library documents in which they appear.",
    "",
    "The Markdown documents remain the canonical source of truth.",
    "",
    "This index must not be edited manually. Regenerate it with:",
    "",
    "```bash",
    "npm run knowledge",
    "```",
    "",
    "---",
    "",
    "## Library Summary",
    "",
    `- Documents indexed: ${documents.length}`,
    `- Concepts recognised: ${concepts.length}`,
    `- Generated: ${new Date().toISOString()}`,
    "",
    "---",
    "",
    "## Concepts",
    "",
  ];

  for (const concept of concepts) {
    const matches = conceptDocuments.get(concept.name) ?? [];

    if (matches.length === 0) {
      continue;
    }

    lines.push(`### ${concept.name}`);
    lines.push("");

    for (const document of matches.sort((a, b) =>
      a.relativePath.localeCompare(b.relativePath),
    )) {
      lines.push(`- [${document.title}](${document.relativePath})`);
    }

    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("## Unmatched Documents");
  lines.push("");
  lines.push(
    "These documents did not match any currently recognised Helping Hand concept.",
  );
  lines.push("");

  const unmatchedDocuments = documents.filter(
    (document) => document.conceptMatches.length === 0,
  );

  if (unmatchedDocuments.length === 0) {
    lines.push("- None");
  } else {
    for (const document of unmatchedDocuments) {
      lines.push(`- [${document.title}](${document.relativePath})`);
    }
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(
    "*Generated from the Helping Hand Engineering Library. Documentation remains canonical.*",
  );

  return `${lines.join("\n").trimEnd()}\n`;
}

async function main() {
  try {
    await fs.access(projectRoot);
  } catch {
    throw new Error(`Project root not found: ${projectRoot}`);
  }

  const markdownFiles = (await walk(scanRoot))
    .filter((absolutePath) => {
      const relativePath = normalisePath(absolutePath);

      return !["knowledge_index.md"].includes(relativePath);
    })
    .sort((a, b) => a.localeCompare(b));

  const documents = [];

  for (const absolutePath of markdownFiles) {
    const content = await fs.readFile(absolutePath, "utf8");
    const headings = extractHeadings(content);

    const document = {
      absolutePath,
      relativePath: normalisePath(absolutePath),
      title: extractTitle(headings, absolutePath),
      headings,
      content,
      conceptMatches: [],
    };

    document.conceptMatches = findConceptMatches(document);
    documents.push(document);
  }

  await Promise.all([
    fs.writeFile(
      outputFiles.inventory,
      buildInventory(documents),
      "utf8",
    ),
    fs.writeFile(
      outputFiles.headers,
      buildHeaderIndex(documents),
      "utf8",
    ),
    fs.writeFile(
      outputFiles.helpingHandHeaders,
      buildHelpingHandHeaderIndex(documents),
      "utf8",
    ),
    fs.writeFile(
      outputFiles.knowledgeIndex,
      buildKnowledgeIndex(documents),
      "utf8",
    ),
  ]);

  const indexedConcepts = new Set(
    documents.flatMap((document) => document.conceptMatches),
  );

  console.log("");
  console.log("Helping Hand Knowledge Pipeline");
  console.log("===============================");
  console.log(`Documents scanned: ${documents.length}`);
  console.log(`Concepts found:    ${indexedConcepts.size}`);
  console.log("");
  console.log("Generated:");
  console.log("- md_inventory.txt");
  console.log("- md_headers.txt");
  console.log("- hh_headers.txt");
  console.log("- knowledge_index.md");
  console.log("");
  console.log("Knowledge pipeline complete.");
}

main().catch((error) => {
  console.error("");
  console.error("Knowledge pipeline failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
