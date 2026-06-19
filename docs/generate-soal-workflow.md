# Generate Soal Workflow

This document explains the end-to-end Generate Soal workflow for Edutive Open Learning Toolkit.

The workflow connects request format, question drafts, review, validation, and dataset export.

## Workflow overview

```text
Request -> Draft -> Review -> Approve -> Export -> Validate -> Dataset
```

## Stage 1: Create request

The user starts by creating a request that describes the desired questions.

Related document:

- [`generate-question-request-format.md`](generate-question-request-format.md)

The request includes subject, topic, difficulty, cognitive level, question count, language, and additional instructions.

## Stage 2: Create question drafts

The system creates question drafts from the request.

Related document:

- [`question-draft-format.md`](question-draft-format.md)

A draft includes the question content plus review metadata such as status and notes.

## Stage 3: Review draft quality

A reviewer should check:

- question clarity,
- option quality,
- answer key correctness,
- explanation accuracy,
- common misconception usefulness,
- metadata correctness,
- and dataset readiness.

Possible status values:

- `draft`
- `needs-review`
- `approved`
- `rejected`

## Stage 4: Export approved drafts

Only approved drafts should be exported.

Export means taking the `question` object from the draft and adding it to a JSON or CSV dataset.

## Stage 5: Validate dataset

After export, run validation:

```bash
npm run validate:examples
```

For a direct file check, use:

```bash
npx tsx packages/question-tools/src/cli.ts validate path/to/questions.json
npx tsx packages/question-tools/src/cli.ts validate path/to/questions.csv
```

## Stage 6: Use dataset in analysis

Once questions are validated, they can be used in later workflows:

- practice result collection,
- topic summary,
- decision support,
- recommendations,
- and future dashboards.

## Prompt templates

Reusable prompt templates are available in:

- [`question-prompt-templates.md`](question-prompt-templates.md)

## Static preview UI

A static preview of the Generate Soal interface is available in:

```text
apps/generate-soal-preview/
```

Open `apps/generate-soal-preview/index.html` in a browser to view it.

## Future implementation notes

The current workflow is documentation and static UI first.

Future implementation may add:

- backend request storage,
- draft review API,
- dataset export tools,
- validation result viewer,
- and integration with question generation models.
