import {
    corePrinciples,
    KnowledgeValidator,
    type KnowledgeValidationIssue,
} from "../lib/knowledge";

function printIssues(
  title: string,
  issues: KnowledgeValidationIssue[],
): void {
  if (issues.length === 0) {
    console.log(`\n${title}: none ✅`);
    return;
  }

  console.log(`\n${title} (${issues.length})`);

  for (const issue of issues) {
    const concept = issue.conceptId
      ? ` [${issue.conceptId}]`
      : "";

    console.log(
      `- ${issue.code}${concept}: ${issue.message}`,
    );
  }
}

function main(): void {
  const validator = new KnowledgeValidator();
  const report = validator.validateRepository(
    corePrinciples,
  );

  console.log("Knowledge Validation Report");
  console.log("==========================");
  console.log(`Valid: ${report.valid ? "yes" : "no"}`);
  console.log(`Concepts: ${report.totalConcepts}`);
  console.log(
    `Evidence levels: candidate=${report.evidenceLevels.candidate}, ` +
      `single-source=${report.evidenceLevels["single-source"]}, ` +
      `multi-source=${report.evidenceLevels["multi-source"]}, ` +
      `constitutional=${report.evidenceLevels.constitutional}`,
  );

  printIssues("Errors", report.errors);
  printIssues("Warnings", report.warnings);

  if (!report.valid) {
    process.exitCode = 1;
  }
}

main();
