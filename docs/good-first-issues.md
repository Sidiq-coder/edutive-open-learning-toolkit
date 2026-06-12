# Good First Issues Guide

This guide helps new contributors find small and beginner-friendly tasks in Edutive Open Learning Toolkit.

The project is still early, so documentation, examples, tests, and dataset improvements are all valuable contributions.

## Who this guide is for

This guide is useful if you:

- are new to open source,
- want to make a small first pull request,
- want to improve educational datasets,
- want to practice TypeScript tooling,
- or want to help make the project easier to understand.

## Contribution categories

### 1. Documentation improvements

Good documentation tasks include:

- fixing typos,
- improving unclear sentences,
- adding examples,
- improving command explanations,
- adding links between related documents,
- and simplifying beginner-facing sections.

Example tasks:

- Improve the Quickstart section in `README.md`.
- Add more examples to `docs/dataset-format.md`.
- Clarify the difference between `difficulty` and `cognitive_level`.
- Add a short FAQ section to a documentation file.

### 2. Dataset examples

Dataset examples help users understand how the toolkit should be used.

Good dataset tasks include:

- adding original sample questions,
- improving answer explanations,
- adding useful tags,
- reviewing question difficulty,
- adding CSV versions of JSON examples,
- and checking that examples pass validation.

Example tasks:

- Add 5 original Mathematics sample questions.
- Add 5 original Science sample questions.
- Add 5 original Indonesian Language sample questions.
- Add 5 original English sample questions.
- Improve `common_misconception` fields in existing examples.

Important: only contribute original questions or content that is allowed to be shared.

### 3. Question quality review

Question quality review is useful even when no code changes are made.

Good review tasks include:

- checking whether the answer key is correct,
- checking whether explanations are clear,
- checking whether distractor options are plausible,
- checking whether tags are useful,
- checking whether difficulty levels are reasonable,
- and checking whether questions are easy to understand.

Example task:

```text
Review examples/mathematics/questions.json and suggest clearer explanations.
```

### 4. Test coverage improvements

The current package uses automated tests for validation and conversion tools.

Good testing tasks include:

- adding tests for edge cases,
- adding tests for invalid CSV rows,
- adding tests for missing options,
- adding tests for empty datasets,
- and improving test names.

Example tasks:

- Add a test for missing CSV columns.
- Add a test for invalid `image_url` values.
- Add a test for invalid `cognitive_level` values.

### 5. CLI usability improvements

The CLI currently supports validation and CSV-to-JSON conversion.

Good CLI tasks include:

- improving help text,
- improving error messages,
- adding clearer command examples,
- and documenting common CLI mistakes.

Example tasks:

- Improve the error message when an unsupported file type is provided.
- Add examples for validating subject-based datasets.

### 6. Translation and localization

Because this project is especially relevant for Indonesian education contexts, localization is welcome.

Good localization tasks include:

- adding Indonesian explanations to selected docs,
- improving English wording,
- translating contributor-facing guides,
- and reviewing terminology consistency.

Example tasks:

- Add Indonesian notes to the dataset contribution guide.
- Review subject naming consistency across examples.

## How to choose an issue

Choose an issue that is:

- small,
- clear,
- related to files you can understand,
- and possible to finish in one pull request.

If you are unsure, start with documentation or dataset improvements.

## How to ask questions

If you want to contribute but are unsure where to start:

1. Open an issue.
2. Describe what you want to work on.
3. Mention the file or topic you are interested in.
4. Ask whether the task is suitable for a first contribution.

Example:

```text
I want to add 5 original English vocabulary questions. Is this a good first contribution?
```

## Before opening a pull request

Before opening a pull request, check:

- [ ] My change is focused on one topic.
- [ ] I did not include copyrighted content.
- [ ] I followed the dataset format if I changed examples.
- [ ] I ran relevant validation commands.
- [ ] I explained what changed in the pull request description.

Recommended commands:

```bash
npm run check
npm test
npm run validate:examples
```

## Recommended first pull request ideas

Here are good first pull request ideas:

- Fix typos in documentation.
- Add a small FAQ section to README.
- Add 5 original sample questions for one subject.
- Improve explanations in existing sample questions.
- Add more helpful tags to sample datasets.
- Add a test for one validator edge case.
- Improve CLI usage examples in package documentation.

Start small. A focused pull request is easier to review and merge.
