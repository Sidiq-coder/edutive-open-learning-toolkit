# @edutive/question-tools

Validation tools for Edutive question datasets.

This package is the first technical module of Edutive Open Learning Toolkit. It provides utilities to validate structured question datasets before they are used in pre-test, post-test, diagnostic, or recommendation workflows.

## Current status

Early development. The first version supports JSON dataset validation.

## Features

- Validate JSON question datasets.
- Check required fields.
- Check supported difficulty values.
- Check answer key values.
- Check multiple choice options.
- Report validation errors with field paths.

## Usage

From the repository root:

```bash
npm install
npm run validate:sample
```

Or run directly from the package:

```bash
npm run validate:sample -w @edutive/question-tools
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

- CSV validation,
- CSV to JSON conversion,
- better error messages,
- schema-based validation,
- unit tests,
- CLI package publishing,
- and dataset quality scoring.
