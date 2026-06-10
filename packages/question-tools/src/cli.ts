#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateQuestionDataset } from "./validator.js";

function printHelp(): void {
  console.log(`Edutive Question Tools

Usage:
  edutive-question-tools validate <file.json>

Examples:
  edutive-question-tools validate examples/sample-questions.json
  npm run validate:sample
`);
}

async function validateFile(filePath: string): Promise<void> {
  const resolvedPath = resolve(process.cwd(), filePath);
  const rawContent = await readFile(resolvedPath, "utf-8");
  const dataset = JSON.parse(rawContent) as unknown;
  const result = validateQuestionDataset(dataset);

  console.log(`Total questions: ${result.totalQuestions}`);

  if (result.valid) {
    console.log("Validation passed. No issues found.");
    return;
  }

  console.log(`Validation failed. Found ${result.issues.length} issue(s):`);

  for (const issue of result.issues) {
    console.log(`- ${issue.path}: ${issue.message}`);
  }

  process.exitCode = 1;
}

async function main(): Promise<void> {
  const [, , command, filePath] = process.argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command !== "validate") {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (!filePath) {
    console.error("Missing file path.");
    printHelp();
    process.exitCode = 1;
    return;
  }

  try {
    await validateFile(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to validate file: ${message}`);
    process.exitCode = 1;
  }
}

void main();
