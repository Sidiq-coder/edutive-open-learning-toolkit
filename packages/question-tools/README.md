# @edutive/question-tools

Validation tools for Edutive question datasets.

This package is the first technical module of Edutive Open Learning Toolkit. It provides utilities to validate structured question datasets before they are used in pre-test, post-test, diagnostic, or recommendation workflows.

## Current status

Early development. The first version supports JSON and CSV dataset validation.

## Features

- Validate JSON question datasets.
- Validate CSV question datasets.
- Check required fields.
- Check supported difficulty values.
- Check answer key values.
- Check multiple choice options.
- Report validation errors with field paths or CSV row numbers.

## Usage

From the repository root:

```bash
npm install
npm run validate:sample
```

## Validate JSON dataset

```bash
npm run validate:sample:json
```

## Validate CSV dataset

```bash
npm run validate:sample:csv
```

Or run directly:

```bash
npx tsx packages/question-tools/src/cli.ts validate examples/sample-questions.csv
```

Expected output:

```text
Total questions: 3
Validation passed. No issues found.
```

## Programmatic usage

```ts
import { validateQuestionDataset } from "@edutive/question-tools";

const result = validateQuestionDataset(dataset);

if (!result.valid) {
  console.log(result.issues);
}
```

## Roadmap

Planned features:

- CSV to JSON conversion,
- better error messages,
- schema-based validation,
- unit tests,
- CLI package publishing,
- and dataset quality scoring.
