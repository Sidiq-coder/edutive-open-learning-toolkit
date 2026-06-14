# Learning Analysis

This document explains the first learning analysis workflow in Edutive Open Learning Toolkit.

The current scope is intentionally small: connect question datasets with practice result records and generate topic-level summaries.

## Purpose

Learning analysis helps transform raw practice answers into simple summaries.

At this stage, the toolkit focuses on:

- matching practice result records to question metadata,
- grouping answers by topic,
- counting total answers per topic,
- counting successful answers per topic,
- calculating a percentage per topic,
- and returning a JSON-friendly output.

This is the foundation for later diagnostic and recommendation features.

## Related documents

Read these first:

- [`dataset-format.md`](dataset-format.md)
- [`practice-result-format.md`](practice-result-format.md)

## Input 1: question dataset

The topic summary utility needs question metadata.

Example question:

```json
{
  "id": "MTK-SAMPLE-001",
  "subject": "Mathematics",
  "topic": "Arithmetic",
  "subtopic": "Order of Operations",
  "difficulty": "easy",
  "cognitive_level": "application",
  "question": "What is the value of 6 + 4 x 2?",
  "options": {
    "A": "14",
    "B": "20",
    "C": "16",
    "D": "12"
  },
  "answer_key": "A",
  "explanation": "Multiplication is done before addition.",
  "tags": ["arithmetic", "order-of-operations"],
  "image_url": null
}
```

The important fields for topic summary are:

- `id`
- `topic`
- `answer_key`

## Input 2: practice result records

Practice result records describe selected answers.

Example result:

```json
{
  "participant_id": "P001",
  "question_id": "MTK-SAMPLE-001",
  "selected_answer": "A",
  "is_correct": true,
  "answered_at": "2026-06-12T09:00:00Z",
  "time_spent_seconds": 35,
  "attempt_number": 1,
  "session_id": "SESSION-DEMO-001",
  "source": "practice"
}
```

The important fields for topic summary are:

- `question_id`
- `selected_answer`
- `is_correct`

If `is_correct` is not provided, the utility can calculate correctness by comparing `selected_answer` with the question `answer_key`.

## Topic summary output

The topic summary utility returns a JSON-friendly object.

Example output:

```json
{
  "participant_id": "P001",
  "topics": [
    {
      "topic": "Arithmetic",
      "total": 2,
      "correct": 1,
      "percentage": 50
    }
  ],
  "unmatched_question_ids": []
}
```

Field meanings:

| Field | Description |
|---|---|
| `participant_id` | Optional participant identifier passed to the utility |
| `topics` | List of topic summaries |
| `topic` | Topic name from the question dataset |
| `total` | Total result records for the topic |
| `correct` | Successful result records for the topic |
| `percentage` | Rounded score percentage |
| `unmatched_question_ids` | Result records that did not match a question ID |

## Programmatic usage

The topic summary utility is exported from `@edutive/question-tools`.

```ts
import { createTopicSummary } from "@edutive/question-tools";

const summary = createTopicSummary(questions, results, {
  participant_id: "P001"
});

console.log(summary);
```

## Example workflow

A simple workflow looks like this:

```text
1. Prepare question datasets.
2. Collect practice result records.
3. Match result records to question IDs.
4. Group matched records by topic.
5. Count total and successful records.
6. Calculate percentage per topic.
7. Use the summary for future diagnostics or recommendations.
```

## Handling unmatched records

If a result record has a `question_id` that does not exist in the question dataset, it is not included in a topic score.

Instead, its ID is added to:

```json
{
  "unmatched_question_ids": ["UNKNOWN-001"]
}
```

This helps users find data quality problems without breaking the summary process.

## Current limitation

This utility is not a full diagnostic engine yet.

It does not currently:

- rank participants,
- recommend materials,
- create a dashboard,
- infer prerequisite gaps,
- or perform machine learning.

Those features belong to later releases.

## Recommended checks

After changing analysis code or examples, run:

```bash
npm run check
npm test
npm run validate:examples
```
