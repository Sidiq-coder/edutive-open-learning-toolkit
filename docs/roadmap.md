# Roadmap

This roadmap describes the planned development path for Edutive Open Learning Toolkit.

The project is intentionally built in phases. The first goal is not to create a complete SaaS product, but to create reusable open source building blocks for education technology projects.

## v0.1.0 - Foundation

Focus: define the project direction and prepare the repository for contributors.

Planned work:

- Define the initial question dataset schema.
- Add sample CSV and JSON question datasets.
- Write dataset format documentation.
- Add contribution guidelines.
- Add code of conduct and security policy.
- Prepare issue and pull request templates.

## v0.2.0 - Question Tools MVP

Focus: make the dataset format useful through validation and conversion tools.

Planned work:

- Build a JSON question validator.
- Build a CSV question validator.
- Build a CSV to JSON converter.
- Add clear validation error messages.
- Add unit tests for validation rules.
- Prepare basic CLI usage.

Example target commands:

```bash
npx edutive-question-tools validate examples/sample-questions.csv
npx edutive-question-tools convert examples/sample-questions.csv --out questions.json
```

## v0.3.0 - Contributor Ready Dataset Tools

Focus: make it easy for other people to contribute datasets and documentation.

Planned work:

- Add dataset contribution guide.
- Add more subject examples.
- Add issue templates for dataset contribution.
- Add documentation for question metadata.
- Add examples for image-based questions.
- Add good first issues.

## v0.4.0 - Diagnostic Engine

Focus: analyze student results and identify learning gaps.

Planned work:

- Define student answer result schema.
- Calculate topic mastery.
- Identify weak topics.
- Map wrong answers to common misconceptions.
- Generate student diagnosis output.
- Add sample data for 32 students.

Initial methods:

- rule-based diagnosis,
- weighted scoring,
- topic-level mastery calculation,
- simple risk level classification.

## v0.5.0 - Decision Support Methods

Focus: support teacher decision-making using simple decision support methods.

Planned work:

- Add SAW method for ranking students who need support.
- Add TOPSIS method for comparison.
- Add Weighted Product method for comparison.
- Add documentation explaining each method.
- Add example comparison output.

## v0.6.0 - Recommendation Engine

Focus: recommend learning actions based on diagnosis results.

Planned work:

- Recommend remedial topics.
- Suggest practice difficulty levels.
- Support prerequisite topic mapping.
- Generate learning recommendations.
- Add classroom-level recommendation summary.

## v0.7.0 - Teacher Insight Dashboard

Focus: create a visual demo that shows how the toolkit can be used in real classroom workflows.

Planned work:

- Create teacher dashboard app.
- Show class overview.
- Show student risk level.
- Visualize weak topics.
- Group students by learning needs.
- Add import sample dataset feature.

## v0.8.0 - NPM Packages and CLI

Focus: make the tools easier to install and reuse.

Planned packages:

- `@edutive/question-tools`
- `@edutive/diagnostic-engine`
- `@edutive/recommendation-engine`

Planned work:

- Publish initial package.
- Add CLI documentation.
- Add changelog.
- Add semantic versioning.
- Add GitHub Actions for tests.

## v1.0.0 - Stable Edutive Dataset Standard

Focus: stabilize the data standard and make it reliable for other projects.

Planned work:

- Stable question schema.
- Stable student result schema.
- Stable diagnostic output schema.
- Full documentation.
- Migration guide from earlier versions.
- More complete examples and tests.

## Long-term ideas

These are not immediate priorities, but may be explored later:

- machine learning experiments for learning analytics,
- clustering students by learning behavior,
- NLP-based explanation analysis,
- LLM-assisted question generation,
- offline-first learning workflows,
- integration with LMS platforms,
- Indonesian curriculum metadata support,
- open education dataset collaboration.

## Maintainer notes

The project should prioritize:

1. clear data standards,
2. simple tools that work reliably,
3. documentation that beginners can understand,
4. contributor-friendly issues,
5. ethical use of student data,
6. and open source sustainability.