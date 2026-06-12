# Edutive Open Learning Toolkit

[![CI](https://github.com/Sidiq-coder/edutive-open-learning-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/Sidiq-coder/edutive-open-learning-toolkit/actions/workflows/ci.yml)

> Open source toolkit for structured question datasets, learning diagnostics, and adaptive education workflows.

Edutive Open Learning Toolkit starts with reusable tools for educational question datasets. The long-term goal is to support diagnostic engines, recommendation engines, and teacher insight dashboards.

## Current status

The current working package is:

```text
@edutive/question-tools
```

Available features:

- JSON question dataset validation
- CSV question dataset validation
- CSV to JSON conversion
- Subject-based example datasets
- Automated tests
- GitHub Actions CI

## Quickstart

```bash
git clone https://github.com/Sidiq-coder/edutive-open-learning-toolkit.git
cd edutive-open-learning-toolkit
npm install
npm run validate:sample:json
npm run validate:sample:csv
npm run validate:examples
npm run convert:sample
npm test
npm run check
```

## Example datasets

The repository includes small original sample datasets for several subjects:

- Mathematics
- Science
- Indonesian Language
- English

Structure:

```text
examples/
├── sample-questions.csv
├── sample-questions.json
├── mathematics/
│   ├── questions.csv
│   └── questions.json
├── science/
│   ├── questions.csv
│   └── questions.json
├── indonesian-language/
│   ├── questions.csv
│   └── questions.json
└── english/
    ├── questions.csv
    └── questions.json
```

These examples are intentionally small. They are meant to show the dataset format, not to act as a complete exam bank.

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
  "explanation": "Substitute x = 4 into f(x) = 2x + 3, so f(4) = 11.",
  "common_misconception": "Students may forget to substitute x with 4 before calculating.",
  "tags": ["function", "linear-function", "substitution"],
  "image_url": null
}
```

For the full format explanation, read [`docs/dataset-format.md`](docs/dataset-format.md).

## Package usage

Direct CLI examples:

```bash
npx tsx packages/question-tools/src/cli.ts validate examples/sample-questions.json
npx tsx packages/question-tools/src/cli.ts validate examples/sample-questions.csv
npx tsx packages/question-tools/src/cli.ts convert examples/sample-questions.csv --out examples/sample-questions.generated.json
```

Package documentation is available in [`packages/question-tools/README.md`](packages/question-tools/README.md).

## Documentation

Useful documents:

- [`docs/roadmap.md`](docs/roadmap.md) — project roadmap
- [`docs/dataset-format.md`](docs/dataset-format.md) — dataset format
- [`docs/dataset-contribution-guide.md`](docs/dataset-contribution-guide.md) — dataset contribution guide
- [`docs/image-based-questions.md`](docs/image-based-questions.md) — image-based question guide
- [`docs/good-first-issues.md`](docs/good-first-issues.md) — beginner-friendly contribution guide
- [`docs/use-cases.md`](docs/use-cases.md) — possible use cases
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution rules

## CI checks

GitHub Actions runs these checks on push and pull request:

```bash
npm run check
npm test
npm run validate:sample:json
npm run validate:sample:csv
npm run validate:examples
npm run convert:sample
```

## Roadmap summary

1. Foundation
2. Question Tools MVP
3. Contributor Ready Dataset Tools
4. Diagnostic Engine
5. Recommendation Engine
6. Teacher Insight Dashboard

See the full roadmap in [`docs/roadmap.md`](docs/roadmap.md).

## Contributing

Contributions are welcome. You can help by:

- improving documentation,
- adding original sample questions,
- improving dataset examples,
- improving validator or converter behavior,
- writing tests,
- or translating documentation.

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before contributing.

New contributors can start from [`docs/good-first-issues.md`](docs/good-first-issues.md).

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

## Maintainer

Maintained by [Sidiq-coder](https://github.com/Sidiq-coder).
