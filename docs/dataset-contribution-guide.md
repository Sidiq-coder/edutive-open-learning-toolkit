# Dataset Contribution Guide

This guide explains how to contribute question datasets to Edutive Open Learning Toolkit.

The goal is to help contributors write clean, consistent, and useful question data that can be validated, converted, and reused by future diagnostic and recommendation tools.

## Before Contributing

Before adding a dataset, make sure you understand the current dataset format.

Recommended reading:

- [`docs/dataset-format.md`](dataset-format.md)
- [`examples/sample-questions.json`](../examples/sample-questions.json)
- [`examples/sample-questions.csv`](../examples/sample-questions.csv)
- [`packages/question-tools/README.md`](../packages/question-tools/README.md)

Install dependencies first:

```bash
npm install
```

Then run the existing checks:

```bash
npm run check
npm test
npm run validate:sample:json
npm run validate:sample:csv
```

## Dataset Formats

Edutive currently supports two question dataset formats:

1. JSON
2. CSV

JSON is easier for applications to consume. CSV is easier for teachers, students, and contributors to edit using spreadsheet tools.

Both formats should represent the same question structure.

## Required Fields

Every question must include these required fields:

| Field | Description | Example |
|---|---|---|
| `id` | Unique question ID | `MTK-FUNC-001` |
| `subject` | Subject name | `Mathematics` |
| `topic` | Main topic | `Functions` |
| `difficulty` | Difficulty level | `medium` |
| `question` | Question text | `If f(x) = 2x + 3, what is f(4)?` |
| `options` | Multiple choice options A-D in JSON | `{ "A": "8", "B": "9", "C": "10", "D": "11" }` |
| `answer_key` | Correct answer key | `D` |
| `explanation` | Explanation of the correct answer | `Substitute x = 4 into the function.` |

For CSV datasets, options are written as:

| CSV column | Meaning |
|---|---|
| `option_a` | Option A |
| `option_b` | Option B |
| `option_c` | Option C |
| `option_d` | Option D |

## Optional Fields

These fields are optional but recommended:

| Field | Description | Example |
|---|---|---|
| `subtopic` | More specific topic | `Linear Functions` |
| `cognitive_level` | Thinking skill level | `application` |
| `common_misconception` | Common student mistake | `Students may forget to substitute x with 4.` |
| `tags` | Keywords for grouping and search | `["function", "linear-function"]` |
| `image_url` | URL for image-based questions | `null` or an image URL |

## Writing Good Questions

A good question should be:

- clear,
- focused on one concept,
- appropriate for the selected difficulty,
- answerable from the given information,
- and original.

Do not copy copyrighted exam questions.

Avoid questions that are too vague, too long, or depend on missing context.

## Writing Answer Options

Multiple choice questions should have exactly four options:

- A
- B
- C
- D

Good options should be:

- plausible,
- similar in style and length,
- not obviously wrong,
- connected to common student mistakes where possible.

Avoid joke options or options that are too easy to eliminate.

## Writing Answer Explanations

Every question must have an `explanation`.

A good explanation should explain why the answer is correct, not just repeat the answer.

Weak explanation:

```text
The answer is D.
```

Better explanation:

```text
Substitute x = 4 into f(x) = 2x + 3. This gives f(4) = 2(4) + 3 = 11, so the correct answer is D.
```

## Writing Common Misconceptions

The `common_misconception` field explains a mistake students might make.

This field is useful for future diagnostic features.

Weak misconception:

```text
Students do not understand.
```

Better misconception:

```text
Students may add 2 + 3 first and then multiply by 4, instead of following the function rule.
```

Good misconceptions should describe a real thinking error.

## Difficulty Guide

Use one of these difficulty values:

| Difficulty | Meaning |
|---|---|
| `easy` | Basic recall or simple one-step question |
| `medium` | Requires understanding or several steps |
| `hard` | Requires deeper reasoning, multi-step work, or careful analysis |

Only use:

```text
easy
medium
hard
```

Do not use values such as:

- `beginner`
- `normal`
- `advanced`
- `very hard`

## Cognitive Level Guide

Use one of these cognitive levels:

| Cognitive level | Meaning |
|---|---|
| `recall` | Remembering facts or definitions |
| `understanding` | Explaining or interpreting a concept |
| `application` | Applying a rule, formula, or method |
| `analysis` | Breaking down information or comparing parts |
| `evaluation` | Judging or selecting based on criteria |
| `creation` | Creating or constructing something new |

Most sample questions will use:

```text
recall
understanding
application
analysis
```

Use `evaluation` and `creation` only when the question really requires those skills.

## Tags Guide

Tags help group, search, and analyze questions.

Good tags are:

- short,
- lowercase,
- specific,
- written with hyphens when needed.

Example JSON tags:

```json
["function", "linear-function", "substitution"]
```

For CSV, write tags as comma-separated text:

```csv
function,linear-function,substitution
```

Avoid tags like:

```json
["Math Hard Question", "Chapter 1 Very Important"]
```

## JSON Contribution Example

```json
[
  {
    "id": "MTK-FUNC-001",
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
    "explanation": "Substitute x = 4 into f(x) = 2x + 3. This gives f(4) = 2(4) + 3 = 11.",
    "common_misconception": "Students may forget to substitute x with 4 before calculating.",
    "tags": ["function", "linear-function", "substitution"],
    "image_url": null
  }
]
```

## CSV Contribution Example

```csv
id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-FUNC-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3. This gives f(4) = 11.","Students may forget to substitute x with 4 before calculating.","function,linear-function,substitution",
```

## Validating Your Dataset

Validate the sample JSON dataset:

```bash
npm run validate:sample:json
```

Validate the sample CSV dataset:

```bash
npm run validate:sample:csv
```

Run tests:

```bash
npm test
```

Run TypeScript checks:

```bash
npm run check
```

## Converting CSV to JSON

If you prepare your dataset in CSV, you can convert it into JSON:

```bash
npm run convert:sample
```

For a custom CSV file, use the CLI directly:

```bash
npx tsx packages/question-tools/src/cli.ts convert path/to/questions.csv --out path/to/questions.json
```

The converter validates the CSV before writing JSON. If the CSV is invalid, no output file should be generated.

## Pull Request Checklist

Before submitting a pull request, check:

- [ ] I used original questions created for this project.
- [ ] Every question has a unique `id`.
- [ ] Every question has a clear `subject` and `topic`.
- [ ] Every question has one of these difficulty values: `easy`, `medium`, `hard`.
- [ ] Every question has exactly four options: A, B, C, and D.
- [ ] Every question has a valid `answer_key`: A, B, C, or D.
- [ ] Every question has a helpful `explanation`.
- [ ] I added `common_misconception` where possible.
- [ ] I added useful `tags`.
- [ ] I validated the dataset.
- [ ] I ran tests if I changed tooling or examples.
- [ ] I did not commit generated output files unless requested.

## Notes for Future Contributors

This project is still early. The dataset format may improve before version `1.0.0`.

If you are unsure about the format, open an issue or ask a question before making a large dataset contribution.
