# Contributing to Edutive Open Learning Toolkit

Thank you for your interest in contributing.

This project welcomes contributions to documentation, examples, schemas, tests, and project direction.

## Ways to contribute

You can help by:

- improving documentation,
- adding original sample questions,
- improving sample datasets,
- suggesting better dataset fields,
- improving validation tools,
- writing tests,
- improving examples,
- or reporting confusing documentation.

## Good first contributions

If you are new to the project, read:

- [`docs/good-first-issues.md`](docs/good-first-issues.md)

Good first contributions include:

- fixing typos,
- improving README sections,
- adding 3 to 5 original sample questions,
- improving explanations in existing examples,
- adding useful tags,
- improving `docs/dataset-format.md`,
- or suggesting validation rules.

## Contributing question datasets

If you want to add or improve question datasets, read:

- [`docs/dataset-contribution-guide.md`](docs/dataset-contribution-guide.md)

Subject-based example datasets are available in:

- `examples/mathematics/`
- `examples/science/`
- `examples/indonesian-language/`
- `examples/english/`

When contributing sample questions, make sure that:

1. the question is original or allowed to be shared,
2. the correct answer is clearly marked,
3. the explanation is included,
4. the topic and difficulty are provided,
5. and the question follows the current dataset format.

## Development workflow

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Run checks.
5. Open a pull request.

Example branch names:

```text
docs/improve-dataset-format
examples/add-math-questions
fix/readme-typo
test/add-validator-edge-case
```

## Validation commands

```bash
npm run check
npm test
npm run validate:examples
```

For quick sample checks:

```bash
npm run validate:sample:json
npm run validate:sample:csv
npm run convert:sample
```

## Pull request guidelines

A good pull request should include:

- a clear title,
- a short explanation of the changes,
- examples if the change affects data format,
- test or validation notes,
- and related issue links if available.

## Commit message style

```text
docs: improve dataset format explanation
examples: add subject question dataset
fix: correct sample answer key
test: add validation test for missing fields
```

## Questions

If something is unclear, open an issue and describe what you are trying to do.
