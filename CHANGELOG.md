# Changelog

## v0.4.0 - Learning Analysis Engine

This release introduces the first learning analysis utilities for Edutive Open Learning Toolkit.

### Added

- Practice result format documentation.
- Database recommendation notes for future implementation.
- Topic summary utility.
- Practice result example records.
- Tests for topic summary behavior.
- Learning analysis usage documentation.

### Learning analysis features

- Match practice result records with question metadata by `question_id`.
- Group records by topic.
- Count total records per topic.
- Count successful records per topic.
- Calculate topic percentage.
- Track unmatched question IDs.
- Return JSON-friendly topic summary output.

### New files

- `docs/practice-result-format.md`
- `docs/learning-analysis.md`
- `examples/practice-results/sample-results.json`
- `packages/question-tools/src/topic-summary.ts`
- `packages/question-tools/src/topic-summary.test.ts`

### Updated files

- `docs/roadmap.md`
- `README.md`
- `packages/question-tools/src/index.ts`

### Recommended checks

```bash
npm run check
npm test
npm run validate:examples
```

### Notes

This release is still intentionally small. It is not a full diagnostic engine yet. It provides the foundation for future decision support and recommendation features.
