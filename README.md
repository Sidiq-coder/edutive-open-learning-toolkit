# Edutive Open Learning Toolkit

[![CI](https://github.com/Sidiq-coder/edutive-open-learning-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/Sidiq-coder/edutive-open-learning-toolkit/actions/workflows/ci.yml)

> An open source toolkit for building structured question datasets, learning diagnostics, and adaptive education workflows.

Edutive Open Learning Toolkit is an early-stage open source project designed to help students, teachers, developers, and education researchers build learning systems based on **pre-test**, **post-test**, **question banks**, **student diagnosis**, and **learning recommendations**.

The project starts small with reusable tools for question datasets, then gradually expands into diagnostic engines, recommendation engines, and teacher insight dashboards.

## Current status

The current working module is:

```text
@edutive/question-tools
```

This package provides command-line and programmatic tools for working with structured educational question datasets.

Current features:

- Validate JSON question datasets.
- Validate CSV question datasets.
- Convert CSV question datasets into structured JSON.
- Run automated tests with Vitest.
- Run automated checks through GitHub Actions CI.

The project is currently in the **Question Tools MVP** stage. The next development focus is making the repository more contributor-friendly by improving documentation, expanding sample datasets, and preparing clearer contribution paths.

## Quickstart

Clone the repository:

```bash
git clone https://github.com/Sidiq-coder/edutive-open-learning-toolkit.git
cd edutive-open-learning-toolkit
```

Install dependencies:

```bash
npm install
```

Validate the sample JSON dataset:

```bash
npm run validate:sample:json
```

Validate the sample CSV dataset:

```bash
npm run validate:sample:csv
```

Convert the sample CSV dataset into JSON:

```bash
npm run convert:sample
```

Run automated tests:

```bash
npm test
```

Run TypeScript checks:

```bash
npm run check
```

## What you can do right now

After installing the project, you can use the toolkit to:

1. Check whether a JSON question dataset follows the expected format.
2. Check whether a CSV question dataset follows the expected format.
3. Convert a CSV dataset into structured JSON.
4. Run tests to make sure the package works correctly.

Example direct CLI usage:

```bash
npx tsx packages/question-tools/src/cli.ts validate examples/sample-questions.json
npx tsx packages/question-tools/src/cli.ts validate examples/sample-questions.csv
npx tsx packages/question-tools/src/cli.ts convert examples/sample-questions.csv --out examples/sample-questions.generated.json
```

The generated file `examples/sample-questions.generated.json` is ignored by Git because it is an output file.

## Why this project exists

Many educational technology projects start from the same difficult problem: the learning content and student result data are not structured properly.

Before building AI, machine learning, dashboards, or recommendation systems, we need a clean foundation:

- a consistent question dataset format,
- clear answer keys and explanations,
- topic and difficulty metadata,
- misconception mapping,
- student answer records,
- diagnostic output standards,
- and reusable tools that other projects can build on.

Edutive Open Learning Toolkit aims to provide that foundation as an open source project.

## Long-term vision

The long-term goal is to build an open ecosystem for adaptive learning tools, especially for Indonesian education contexts.

In the future, this project is expected to support:

- structured question dataset creation,
- question validation and conversion tools,
- pre-test and post-test workflows,
- student learning gap diagnosis,
- misconception detection,
- personalized learning recommendations,
- teacher insight dashboards,
- classroom-level analytics,
- and machine learning experiments for educational data.

## Project scope

This repository is not intended to become a complete SaaS product immediately. Instead, it is built as a modular toolkit.

The first development path is:

```text
Question Dataset Standard -> Validator -> Converter -> Diagnostic Engine -> Recommendation Engine -> Teacher Dashboard
```

## Planned modules

| Module | Description | Status |
|---|---|---|
| Question Schema | Standard JSON structure for educational questions | Experimental |
| Dataset Validator | Validate CSV/JSON question datasets | Available |
| CSV to JSON Converter | Convert teacher-friendly CSV files into structured JSON | Available |
| Automated Tests | Unit tests for validator, CSV parser, and converter | Available |
| GitHub Actions CI | Automated checks for push and pull request | Available |
| Sample Datasets | Example question datasets for testing and learning | Started |
| Dataset Contribution Guide | Guide for contributing new question datasets | Available |
| Image-Based Question Docs | Guide for questions that use `image_url` | Planned |
| Diagnostic Engine | Analyze student answers and detect weak topics | Planned |
| Recommendation Engine | Recommend learning activities based on diagnosis | Planned |
| Teacher Dashboard | Visualize student progress and class-level insights | Planned |
| ML Experiments | Explore clustering, classification, and NLP for learning analytics | Planned |

## Repository structure

```text
edutive-open-learning-toolkit/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── roadmap.md
│   ├── dataset-format.md
│   └── use-cases.md
├── examples/
│   ├── sample-questions.csv
│   └── sample-questions.json
├── packages/
│   └── question-tools/
├── schemas/
│   └── question.schema.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── package.json
└── package-lock.json
```

## Question dataset format

A question item follows this general structure:

```json
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
  "explanation": "Substitute x = 4 into f(x) = 2x + 3, so f(4) = 2(4) + 3 = 11.",
  "common_misconception": "Students may forget to substitute x with 4 before calculating.",
  "tags": ["function", "linear-function", "substitution"],
  "image_url": null
}
```

For the full format explanation, read [`docs/dataset-format.md`](docs/dataset-format.md).

## Package: `@edutive/question-tools`

The first package in this repository is located in:

```text
packages/question-tools
```

It currently provides:

- `validateQuestionDataset()` for validating question objects,
- `parseQuestionCsv()` for parsing CSV question datasets,
- `convertCsvToJson()` for converting CSV content into formatted JSON,
- a CLI command for validation and conversion.

Package-level documentation is available in [`packages/question-tools/README.md`](packages/question-tools/README.md).

## Project documentation

Useful documents:

- [`docs/roadmap.md`](docs/roadmap.md) — project development roadmap.
- [`docs/dataset-format.md`](docs/dataset-format.md) — current question dataset format.
- [`docs/dataset-contribution-guide.md`](docs/dataset-contribution-guide.md) — guide for contributing question datasets.
- [`docs/use-cases.md`](docs/use-cases.md) — possible use cases for the toolkit.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution guidelines.
- [`packages/question-tools/README.md`](packages/question-tools/README.md) — package usage notes.

More contributor-focused documentation will continue to be added in the next `v0.3.0` updates.

## Continuous Integration

This repository uses GitHub Actions to run automated checks on every push and pull request to `main`.

The CI workflow runs:

```bash
npm run check
npm test
npm run validate:sample:json
npm run validate:sample:csv
npm run convert:sample
```

## Roadmap summary

### Phase 1: Foundation

- Define question dataset schema.
- Add sample CSV and JSON datasets.
- Write dataset format documentation.
- Prepare contribution guidelines.

### Phase 2: Question Tools MVP

- Build dataset validator.
- Build CSV to JSON converter.
- Add automated tests.
- Add GitHub Actions CI.
- Prepare CLI usage.

### Phase 3: Contributor Ready Dataset Tools

- Improve root README quickstart.
- Add dataset contribution guide.
- Add image-based question documentation.
- Expand sample datasets by subject.
- Add good first issue guide.

### Phase 4: Diagnostic Engine

- Analyze student answers by topic.
- Calculate topic mastery.
- Detect weak topics and misconceptions.
- Generate simple student diagnosis output.

### Phase 5: Recommendation Engine

- Recommend remedial topics.
- Suggest practice difficulty levels.
- Support prerequisite topic mapping.
- Generate learning recommendations.

### Phase 6: Teacher Insight Dashboard

- Show class overview.
- Identify students who need support.
- Visualize weak topics.
- Group students by learning needs.

See the full roadmap in [`docs/roadmap.md`](docs/roadmap.md).

## Who is this for?

This project is useful for:

- students building education technology projects,
- teachers who want structured question banks,
- developers building quiz or try out platforms,
- researchers working with learning analytics,
- open source contributors interested in education,
- and anyone exploring AI-assisted learning systems.

## Contributing

Contributions are welcome. You can help by:

- improving documentation,
- adding original sample questions,
- improving the question schema,
- improving validator or converter features,
- writing tests,
- suggesting learning analytics methods,
- or translating documentation.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before contributing.

## Good first contribution ideas

- Add 5 original sample math questions.
- Add original science or language sample questions.
- Improve the dataset format documentation.
- Add more validation examples.
- Improve explanation text for sample questions.
- Fix typos in documentation.
- Suggest better field names for learning analytics.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

## Maintainer

Maintained by [Sidiq-coder](https://github.com/Sidiq-coder).

This project is part of a long-term effort to build open source learning tools for adaptive education and student diagnosis.
