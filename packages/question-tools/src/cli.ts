#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { parseQuestionCsv } from "./csv.js";
import { validateQuestionDataset } from "./validator.js";

function printHelp(): void {
  console.log(`Edutive Question Tools

Usage:
  edutive-question-tools validate <file.json|file.csv>

Examples:
  edutive-question-tools validate examples/sample-questions.json
  edutive-question-tools validate examples/sample-questions.csv
  npm run validate:sample
`);
}

async function validateFile(filePath: string): Promise<void> {
  const resolvedPath = resolve(process.cwd(), filePath);
  const rawContent = await readFile(resolvedPath, "utf-8");
  const extension = extname(resolvedPath).toLowerCase();

  let dataset: unknown;
  let pathFormatter: ((index: number) => string) | undefined;

  if (extension === ".json") {
    dataset = JSON.parse(rawContent) as unknown;
  } else if (extension === ".csv") {
    dataset = parseQuestionCsv(rawContent);
    pathFormatter = (index) => `row ${index + 2}`;
  } else {
    throw new Error("Unsupported file type. Please provide a .json or .csv file.");
  }

  const result = validateQuestionDataset(dataset, { pathFormatter });

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
