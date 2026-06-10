# Edutive Open Learning Toolkit

> An open source toolkit for building structured question datasets, learning diagnostics, and adaptive education workflows.

Edutive Open Learning Toolkit is an early-stage open source project designed to help students, teachers, developers, and education researchers build learning systems based on **pre-test**, **post-test**, **question banks**, **student diagnosis**, and **learning recommendations**.

The project starts small with reusable tools for question datasets, then gradually expands into diagnostic engines, recommendation engines, and teacher insight dashboards.

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

The first focus is:

```text
Question Dataset Standard -> Validator -> Converter -> Diagnostic Engine -> Recommendation Engine -> Teacher Dashboard
```

## Planned modules

| Module | Description | Status |
|---|---|---|
| Question Schema | Standard JSON structure for educational questions | Planned |
| Dataset Validator | Validate CSV/JSON question datasets | Planned |
| CSV to JSON Converter | Convert teacher-friendly CSV files into structured JSON | Planned |
| Sample Datasets | Example question datasets for testing and learning | Started |
| Diagnostic Engine | Analyze student answers and detect weak topics | Planned |
| Recommendation Engine | Recommend learning activities based on diagnosis | Planned |
| Teacher Dashboard | Visualize student progress and class-level insights | Planned |
| ML Experiments | Explore clustering, classification, and NLP for learning analytics | Planned |

## Repository structure

```text
edutive-open-learning-toolkit/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── roadmap.md
│   ├── dataset-format.md
│   ├── contribution-guide.md
│   └── use-cases.md
├── examples/
│   ├── sample-questions.csv
│   └── sample-questions.json
├── schemas/
│   └── question.schema.json
├── packages/
│   └── question-tools/
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Example question format

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
  "tags": ["function", "linear-function", "substitution"]
}
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
- Add clear error reporting.
- Prepare CLI usage.

### Phase 3: Diagnostic Engine

- Analyze student answers by topic.
- Calculate topic mastery.
- Detect weak topics and misconceptions.
- Generate simple student diagnosis output.

### Phase 4: Recommendation Engine

- Recommend remedial topics.
- Suggest practice difficulty levels.
- Support prerequisite topic mapping.
- Generate learning recommendations.

### Phase 5: Teacher Insight Dashboard

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
- adding sample questions,
- improving the question schema,
- building validator features,
- writing tests,
- creating dashboard components,
- suggesting learning analytics methods,
- or translating documentation.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before contributing.

## Good first contribution ideas

- Add 5 sample math questions.
- Improve the dataset format documentation.
- Add validation rules to the question schema.
- Create examples for science or language subjects.
- Fix typos in documentation.
- Suggest better field names for learning analytics.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

## Maintainer

Maintained by [Sidiq-coder](https://github.com/Sidiq-coder).

This project is part of a long-term effort to build open source learning tools for adaptive education and student diagnosis.