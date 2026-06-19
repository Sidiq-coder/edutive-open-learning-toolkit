# Recommendation Input Format

This document defines the input format for recommendation utilities in Edutive Open Learning Toolkit.

The format is designed to turn topic summaries and decision support output into simple learning recommendations.

## Purpose

Recommendation input helps answer:

```text
What should be reviewed next?
```

The format is intentionally transparent and small.

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `participant_id` | string | Yes | Fictional or system-generated participant identifier |
| `topic_scores` | array | Yes | List of topic score objects |

## Topic score fields

| Field | Type | Required | Description |
|---|---|---|---|
| `topic` | string | Yes | Topic name |
| `percentage` | number | Yes | Score percentage for the topic |

## Optional fields

| Field | Type | Description |
|---|---|---|
| `weak_topic_threshold` | number | Threshold for topics that need review |
| `strong_topic_threshold` | number | Threshold for strong topics |

## Input example

```json
{
  "participant_id": "P001",
  "weak_topic_threshold": 60,
  "strong_topic_threshold": 80,
  "topic_scores": [
    {
      "topic": "Arithmetic",
      "percentage": 40
    },
    {
      "topic": "Fractions",
      "percentage": 70
    },
    {
      "topic": "Geometry",
      "percentage": 90
    }
  ]
}
```

## From topic summary to recommendation input

Topic summary output can be transformed into recommendation input.

Topic summary:

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
  ]
}
```

Recommendation input:

```json
{
  "participant_id": "P001",
  "topic_scores": [
    {
      "topic": "Arithmetic",
      "percentage": 50
    }
  ]
}
```

## From decision support output to recommendation input

Decision support output can help determine priority, while topic scores determine what content should be reviewed.

Recommended workflow:

```text
1. Calculate topic summary.
2. Use topic scores as recommendation input.
3. Use decision support ranking as priority context.
4. Generate topic-level recommendations.
```

## Fictional sample data only

Use fictional identifiers in examples and tests.

Recommended:

```text
P001
P002
P003
```

Do not include real personal information in repository examples.
