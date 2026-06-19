# Changelog

## Unreleased - React UI Rewrite

### Changed

- Replaced static HTML UI previews with a React + TypeScript app.
- Added Vite-based UI app in `apps/edutive-ui`.
- Added reusable UI components for buttons, cards, badges, section headers, navigation, feature cards, workflow steps, generate form, question preview, and dataset preview.
- Added data-driven navigation, feature map, workflow, and question preview data.
- Added controlled form state for the Generate Soal prototype.
- Removed old standalone static HTML pages from `apps/generate-soal-preview` and `apps/project-landing`.
- Updated legacy preview READMEs to point to the React app.

### New UI app

```text
apps/edutive-ui
```

Run locally:

```bash
cd apps/edutive-ui
npm install
npm run dev
```

## v0.7.0 - Generate Soal Workflow

This release improves the product direction around Generate Soal and adds a landing page preview for the whole project.

### Added

- Generate question request format documentation.
- Question draft format documentation.
- Question prompt templates.
- Generate Soal workflow documentation.
- Improved Generate Soal static preview.
- Project landing page static preview.

### Generate Soal workflow

- Request format for subject, topic, difficulty, cognitive level, count, language, style, and additional instructions.
- Draft format before questions are approved into the dataset.
- Review status values for draft workflow.
- Prompt templates for structured multiple-choice questions.
- Workflow documentation from request to dataset-ready output.

### UI previews

- `apps/generate-soal-preview/` for focused Generate Soal interface.
- `apps/project-landing/` for overall project introduction and feature navigation.

### Notes

The UI previews are static and dependency-free. They are visual references for future app development.

## v0.6.0 - Recommendation Engine

This release introduces the first recommendation utility and an early Generate Soal UI preview.

### Added

- Recommendation input format documentation.
- Recommendation utility for topic-score based guidance.
- Recommendation example input and output.
- Tests for recommendation behavior.
- Recommendation usage documentation.
- Static Generate Soal preview UI.

### Recommendation features

- Detect topics below a review threshold.
- Detect strong topics above a threshold.
- Suggest review priority.
- Suggest practice difficulty.
- Return JSON-friendly recommendation output.

### Generate Soal preview

- Static UI preview for question generation workflow.
- Configuration form for subject, topic, difficulty, cognitive level, and prompt notes.
- Preview card for generated multiple-choice questions.
- Breakdown area for answer key, explanation, and common misconception.
- Dataset-ready output overview.
- Pipeline preview from generate to review, validate, and analyze.

### New files

- `docs/recommendation-input-format.md`
- `docs/recommendations.md`
- `examples/recommendations/sample-input.json`
- `examples/recommendations/sample-output.json`
- `examples/recommendations/README.md`
- `packages/question-tools/src/recommendations.ts`
- `packages/question-tools/src/recommendations.test.ts`
- `apps/generate-soal-preview/index.html`
- `apps/generate-soal-preview/README.md`

### Updated files

- `packages/question-tools/src/index.ts`
- `CHANGELOG.md`

### Recommended checks

```bash
npm run check
npm test
npm run validate:examples
```

### Notes

This release keeps the system simple while making the product direction easier to visualize. The Generate Soal preview is static and is intended as a starting reference for future app development.

## v0.5.0 - Decision Support Methods

This release introduces the first transparent decision support utility for Edutive Open Learning Toolkit.

### Added

- Decision support input format documentation.
- SAW ranking utility.
- Decision support example records.
- Decision support criteria examples.
- Tests for SAW ranking behavior.
- Decision support usage documentation.
