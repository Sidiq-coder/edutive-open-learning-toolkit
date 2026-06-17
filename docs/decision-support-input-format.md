# Decision Support Input Format

This document defines the input format for decision support utilities in Edutive Open Learning Toolkit.

The format is intentionally simple. It is designed to transform learning analysis summaries into records that can be compared with transparent decision support methods such as SAW.

## Purpose

The decision support input format helps answer questions like:

```text
Which participant should receive review support first?
```

This is not meant to replace teacher judgment. It is a transparent helper format for ranking and comparison.

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique record ID |
| `label` | string | No | Human-readable label |
| `values` | object | Yes | Numeric criteria values |

## Suggested criteria values

These fields can be stored inside `values`:

| Field | Type | Direction | Description |
|---|---|---|---|
| `topic_score_average` | number | benefit | Average topic score percentage |
| `completion_rate` | number | benefit | Percentage of completed items |
| `attempt_count` | number | cost or benefit | Number of attempts, depending on context |
| `time_spent_total_seconds` | number | cost or benefit | Total time spent |
| `review_need_score` | number | benefit | Manual or computed need score |

A benefit criterion means a higher value is better. A cost criterion means a lower value is better.

## Record example

```json
{
  "id": "P001",
  "label": "Participant 1",
  "values": {
    "topic_score_average": 60,
    "completion_rate": 90,
    "attempt_count": 2,
    "time_spent_total_seconds": 400,
    "review_need_score": 80
  }
}
```

## Criteria example

```json
[
  {
    "key": "review_need_score",
    "weight": 0.5,
    "type": "benefit"
  },
  {
    "key": "topic_score_average",
    "weight": 0.3,
    "type": "cost"
  },
  {
    "key": "time_spent_total_seconds",
    "weight": 0.2,
    "type": "benefit"
  }
]
```

## From topic summary to decision support input

A topic summary can be transformed into decision support input by calculating aggregate values.

Example topic summary:

```json
{
  "participant_id": "P001",
  "topics": [
    {
      "topic": "Arithmetic",
      "total": 2,
      "correct": 1,
      "percentage": 50
    },
    {
      "topic": "Fractions",
      "total": 1,
      "correct": 0,
      "percentage": 0
    }
  ]
}
```

Possible decision support record:

```json
{
  "id": "P001",
  "label": "Participant 1",
  "values": {
    "topic_score_average": 25,
    "completion_rate": 100,
    "attempt_count": 3,
    "review_need_score": 75
  }
}
```

## Fictional sample data only

Use fictional identifiers in examples and tests.

Recommended:

```text
P001
P002
P003
```

Do not include real names, emails, phone numbers, school IDs, or other personal information.

## Notes

The input format may evolve as the project adds more decision support methods.

For now, keep records small, numeric, and easy to review.
