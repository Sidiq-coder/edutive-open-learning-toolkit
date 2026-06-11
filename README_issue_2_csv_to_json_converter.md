# README — Issue #2: Add CSV to JSON Converter

This document is a focused implementation guide for:

**Issue:** [#2 Add CSV to JSON converter](https://github.com/Sidiq-coder/edutive-open-learning-toolkit/issues/2)  
**Repository:** `Sidiq-coder/edutive-open-learning-toolkit`  
**Package:** `packages/question-tools`  
**Target release:** `v0.2.0`

---

## 1. Goal

Create a converter that transforms Edutive CSV question datasets into structured JSON.

CSV is easier for teachers, students, and contributors to edit using spreadsheet tools. JSON is easier for applications, validators, diagnostic engines, recommendation engines, and dashboards to consume.

The expected command is:

```bash
edutive-question-tools convert examples/sample-questions.csv --out examples/sample-questions.generated.json
```

The generated JSON should follow the same structure as:

```text
examples/sample-questions.json
```

---

## 2. Current Context

At this stage, the package should already support:

- JSON dataset validation,
- CSV dataset validation,
- CSV parsing through `parseQuestionCsv()`,
- automated tests for validator and CSV parser.

Important existing files:

```text
packages/question-tools/
├── package.json
├── README.md
└── src/
    ├── cli.ts
    ├── csv.ts
    ├── csv.test.ts
    ├── index.ts
    ├── types.ts
    ├── validator.ts
    └── validator.test.ts
```

Issue #2 should build on top of the existing CSV parser from Issue #1.

Do not rewrite the CSV parser unless needed.

---

## 3. Scope

This issue should implement only:

```text
CSV to JSON conversion
```

Allowed work:

- add conversion function,
- add CLI `convert` command,
- support `--out` argument,
- output formatted JSON,
- add tests for conversion,
- update README package documentation,
- update package scripts if useful.

Do not implement:

- dashboard,
- diagnostic engine,
- recommendation engine,
- GitHub Actions CI,
- NPM publishing,
- major schema changes,
- unrelated refactoring.

---

## 4. Expected CSV Input

The CSV format follows the current Edutive dataset format:

```csv
id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
```

Example row:

```csv
MTK-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3, so f(4) = 11.","Students may forget to substitute x with 4.","function,linear-function,substitution",
```

---

## 5. Expected JSON Output

The converter should output an array of question objects:

```json
[
  {
    "id": "MTK-001",
    "subject": "Mathematics",
    "topic": "Functions",
    "subtopic": "Linear Functions",
    "difficulty": "medium",
    "cognitive_level": "application",
    "question": "If f(x) = 2x + 3, what is f(4)?",
    "options": {
      "A": "8",
      "B": "9",
      "C": "10",
      "D": "11"
    },
    "answer_key": "D",
    "explanation": "Substitute x = 4 into f(x) = 2x + 3, so f(4) = 11.",
    "common_misconception": "Students may forget to substitute x with 4.",
    "tags": [
      "function",
      "linear-function",
      "substitution"
    ],
    "image_url": null
  }
]
```

The JSON should be formatted with 2-space indentation.

---

## 6. Implementation Plan

### Step 1 — Add converter module

Create:

```text
packages/question-tools/src/converter.ts
```

Recommended implementation:

```ts
import { parseQuestionCsv } from "./csv.js";
import { validateQuestionDataset } from "./validator.js";

export interface ConvertCsvToJsonOptions {
  validate?: boolean;
}

export interface ConvertCsvToJsonResult {
  json: string;
  totalQuestions: number;
}

export function convertCsvToJson(
  csvContent: string,
  options: ConvertCsvToJsonOptions = { validate: true }
): ConvertCsvToJsonResult {
  const questions = parseQuestionCsv(csvContent);

  if (options.validate !== false) {
    const validationResult = validateQuestionDataset(questions, {
      pathFormatter: (index) => `row ${index + 2}`
    });

    if (!validationResult.valid) {
      const message = validationResult.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("\n");

      throw new Error(`CSV validation failed before conversion:\n${message}`);
    }
  }

  return {
    json: JSON.stringify(questions, null, 2),
    totalQuestions: questions.length
  };
}
```

Notes:

- Reuse `parseQuestionCsv()` from `csv.ts`.
- Validate before converting by default.
- If validation fails, do not generate JSON.
- Return both formatted JSON and total question count.
- Keep the converter simple.

---

### Step 2 — Export converter API

Modify:

```text
packages/question-tools/src/index.ts
```

Add:

```ts
export { convertCsvToJson } from "./converter.js";
export type { ConvertCsvToJsonOptions, ConvertCsvToJsonResult } from "./converter.js";
```

---

### Step 3 — Update CLI to support `convert`

Modify:

```text
packages/question-tools/src/cli.ts
```

Current CLI likely supports only:

```bash
edutive-question-tools validate <file.json|file.csv>
```

It should support:

```bash
edutive-question-tools convert <file.csv> --out <file.json>
```

Recommended behavior:

```bash
edutive-question-tools convert examples/sample-questions.csv --out examples/sample-questions.generated.json
```

Expected output:

```text
Converted 3 question(s).
Output written to examples/sample-questions.generated.json
```

If `--out` is missing:

```text
Missing required --out argument.
```

If input is not `.csv`:

```text
Convert command only supports .csv input files.
```

If validation fails before conversion:

```text
Failed to convert file: CSV validation failed before conversion:
row 2.answer_key: Answer key must be one of: A, B, C, D.
```

Recommended CLI update:

```ts
import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { convertCsvToJson } from "./converter.js";
```

Add helper:

```ts
function getFlagValue(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
}
```

Add convert function:

```ts
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
```

Update `main()` logic:

```ts
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
```

Update help text:

```text
Edutive Question Tools

Usage:
  edutive-question-tools validate <file.json|file.csv>
  edutive-question-tools convert <file.csv> --out <file.json>

Examples:
  edutive-question-tools validate examples/sample-questions.json
  edutive-question-tools validate examples/sample-questions.csv
  edutive-question-tools convert examples/sample-questions.csv --out examples/sample-questions.generated.json
  npm run validate:sample
```

---

### Step 4 — Add tests for converter

Create:

```text
packages/question-tools/src/converter.test.ts
```

Recommended content:

```ts
import { describe, expect, it } from "vitest";
import { convertCsvToJson } from "./converter.js";

const validCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3.","Students may forget to substitute x with 4.","function,linear-function,substitution",
`;

describe("convertCsvToJson", () => {
  it("converts valid CSV content into formatted JSON", () => {
    const result = convertCsvToJson(validCsv);

    expect(result.totalQuestions).toBe(1);

    const parsed = JSON.parse(result.json);

    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      id: "MTK-001",
      subject: "Mathematics",
      topic: "Functions",
      subtopic: "Linear Functions",
      difficulty: "medium",
      cognitive_level: "application",
      question: "If f(x) = 2x + 3, what is f(4)?",
      options: {
        A: "8",
        B: "9",
        C: "10",
        D: "11"
      },
      answer_key: "D",
      explanation: "Substitute x = 4 into f(x) = 2x + 3.",
      common_misconception: "Students may forget to substitute x with 4.",
      tags: ["function", "linear-function", "substitution"],
      image_url: null
    });
  });

  it("throws an error when CSV validation fails", () => {
    const invalidCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-BAD-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,E,"Substitute x = 4 into f(x) = 2x + 3.","Invalid answer key example.","function,linear-function",
`;

    expect(() => convertCsvToJson(invalidCsv)).toThrow(
      "CSV validation failed before conversion:"
    );
  });

  it("can skip validation when requested", () => {
    const invalidCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-BAD-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,E,"Substitute x = 4 into f(x) = 2x + 3.","Invalid answer key example.","function,linear-function",
`;

    const result = convertCsvToJson(invalidCsv, { validate: false });
    const parsed = JSON.parse(result.json);

    expect(result.totalQuestions).toBe(1);
    expect(parsed[0].answer_key).toBe("E");
  });
});
```

---

### Step 5 — Update package scripts

Modify:

```text
packages/question-tools/package.json
```

Add:

```json
"convert:sample": "tsx src/cli.ts convert ../../examples/sample-questions.csv --out ../../examples/sample-questions.generated.json"
```

Scripts should become similar to:

```json
"scripts": {
  "build": "tsc -p tsconfig.json",
  "check": "tsc -p tsconfig.json --noEmit",
  "test": "vitest run",
  "validate:sample": "tsx src/cli.ts validate ../../examples/sample-questions.json",
  "validate:sample:json": "tsx src/cli.ts validate ../../examples/sample-questions.json",
  "validate:sample:csv": "tsx src/cli.ts validate ../../examples/sample-questions.csv",
  "convert:sample": "tsx src/cli.ts convert ../../examples/sample-questions.csv --out ../../examples/sample-questions.generated.json"
}
```

Modify root:

```text
package.json
```

Add:

```json
"convert:sample": "npm run convert:sample -w @edutive/question-tools"
```

---

### Step 6 — Update `.gitignore`

If the repository has no `.gitignore`, create one.

Add generated file pattern:

```gitignore
node_modules/
dist/
coverage/
examples/*.generated.json
```

Reason:

- `examples/sample-questions.generated.json` is output from the converter.
- It should not be committed unless the maintainer intentionally wants generated examples tracked.

If the project already has `.gitignore`, only add missing entries.

---

### Step 7 — Update package README

Modify:

```text
packages/question-tools/README.md
```

Add section:

````md
## Convert CSV to JSON

Convert a CSV question dataset into structured JSON:

```bash
npm run convert:sample
```

Or directly:

```bash
npx tsx packages/question-tools/src/cli.ts convert examples/sample-questions.csv --out examples/sample-questions.generated.json
```

Expected output:

```text
Converted 3 question(s).
Output written to examples/sample-questions.generated.json
```

The converter validates the CSV dataset before writing JSON. If validation fails, no output file is generated.
````

Update feature list:

```md
- Validate JSON question datasets.
- Validate CSV question datasets.
- Convert CSV question datasets into structured JSON.
- Check required fields.
- Check supported difficulty values.
- Check answer key values.
- Check multiple choice options.
- Report validation errors with field paths or CSV row numbers.
```

---

## 7. Commands That Must Pass

From repository root:

```bash
npm install
npm run check
npm test
npm run validate:sample:json
npm run validate:sample:csv
npm run convert:sample
```

After running:

```bash
npm run convert:sample
```

A generated file should be created:

```text
examples/sample-questions.generated.json
```

Then inspect the generated file manually and confirm:

- it is valid JSON,
- it contains 3 questions,
- it has `options` object,
- it has `tags` array,
- it uses `image_url: null` for empty image URL values.

Because generated files should not be committed, remove it after manual inspection if necessary:

```bash
rm examples/sample-questions.generated.json
```

On Windows PowerShell:

```powershell
Remove-Item examples/sample-questions.generated.json
```

---

## 8. Acceptance Criteria

This issue is complete when all items below are true.

- [ ] CSV files can be converted to JSON.
- [ ] Converter reuses the existing CSV parser.
- [ ] Converter validates parsed CSV data before writing JSON.
- [ ] Invalid CSV data blocks conversion with a clear error.
- [ ] JSON output is formatted with 2-space indentation.
- [ ] CLI supports `convert <file.csv> --out <file.json>`.
- [ ] CLI rejects non-CSV input for the convert command.
- [ ] CLI shows a clear error when `--out` is missing.
- [ ] Package exports the converter function.
- [ ] Converter tests are added.
- [ ] README documents the convert command.
- [ ] Generated JSON output is ignored by Git.
- [ ] Existing validation commands still work.
- [ ] Existing tests still pass.

---

## 9. Suggested Final File Changes

Expected modified files:

```text
package.json
.gitignore
packages/question-tools/package.json
packages/question-tools/README.md
packages/question-tools/src/cli.ts
packages/question-tools/src/index.ts
```

Expected new files:

```text
packages/question-tools/src/converter.ts
packages/question-tools/src/converter.test.ts
```

Do not modify unrelated files.

---

## 10. Suggested Commit Message

Use:

```text
feat: add CSV to JSON converter
```

If splitting into smaller commits:

```text
feat: add CSV to JSON converter API
feat: add convert command to question tools CLI
test: add converter tests
docs: document CSV to JSON conversion
```

---

## 11. Suggested PR Description

Use this PR description:

```md
## Summary

This PR adds CSV to JSON conversion support to `@edutive/question-tools`.

## Changes

- Added `convertCsvToJson()` converter API.
- Added CLI support for `convert <file.csv> --out <file.json>`.
- Reused the existing CSV parser from the validation feature.
- Added validation before conversion.
- Added converter tests.
- Added sample conversion script.
- Updated package README.
- Ignored generated JSON files.

## Test commands

```bash
npm install
npm run check
npm test
npm run validate:sample:json
npm run validate:sample:csv
npm run convert:sample
```

## Related issue

Closes #2
```

---

## 12. Final Reminder

Stay focused on Issue #2.

Do not implement GitHub Actions CI in this issue.

Do not build dashboard or diagnostic features yet.

The goal is only:

```text
CSV dataset -> structured JSON dataset
```
