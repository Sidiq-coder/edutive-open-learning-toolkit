#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { convertCsvToJson } from "./converter.js";
import { parseQuestionCsv } from "./csv.js";
import { validateQuestionDataset } from "./validator.js";

function printHelp(): void {
  console.log(`Edutive Question Tools

Usage:
  edutive-question-tools validate <file.json|file.csv>
  edutive-question-tools convert <file.csv> --out <file.json>

Examples:
  edutive-question-tools validate examples/sample-questions.json
  edutive-question-tools validate examples/sample-questions.csv
  edutive-question-tools convert examples/sample-questions.csv --out examples/sample-questions.generated.json
  npm run validate:sample
`);
}

function getFlagValue(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
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

async function convertFile(filePath: string, outputPath: string): Promise<void> {
  const resolvedInputPath = resolve(process.cwd(), filePath);
  const resolvedOutputPath = resolve(process.cwd(), outputPath);
  const extension = extname(resolvedInputPath).toLowerCase();

  if (extension !== ".csv") {
    throw new Error("Convert command only supports .csv input files.");
  }

  const rawContent = await readFile(resolvedInputPath, "utf-8");
  const result = convertCsvToJson(rawContent);

  await writeFile(resolvedOutputPath, `${result.json}\n`, "utf-8");

  console.log(`Converted ${result.totalQuestions} question(s).`);
  console.log(`Output written to ${outputPath}`);
}

async function main(): Promise<void> {
  const [, , command, filePath, ...args] = process.argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "validate") {
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

    return;
  }

  if (command === "convert") {
    if (!filePath) {
      console.error("Missing file path.");
      printHelp();
      process.exitCode = 1;
      return;
    }

    const outputPath = getFlagValue(args, "--out");

    if (!outputPath) {
      console.error("Missing required --out argument.");
      printHelp();
      process.exitCode = 1;
      return;
    }

    try {
      await convertFile(filePath, outputPath);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to convert file: ${message}`);
      process.exitCode = 1;
    }

    return;
  }

  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

void main();
