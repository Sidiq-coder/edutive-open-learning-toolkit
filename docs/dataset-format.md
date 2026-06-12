# Dataset Format

This document describes the initial dataset format used by Edutive Open Learning Toolkit.

The format is still experimental and may change before version `1.0.0`.

## Goals

The question dataset format is designed to be:

- easy to write manually,
- easy to store as CSV or JSON,
- easy to validate,
- suitable for pre-test and post-test workflows,
- useful for student diagnosis,
- and extensible for future learning analytics.

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique question ID |
| `subject` | string | Yes | Subject name, such as Mathematics |
| `topic` | string | Yes | Main topic |
| `subtopic` | string | No | More specific topic |
| `difficulty` | string | Yes | `easy`, `medium`, or `hard` |
| `cognitive_level` | string | No | Learning level, such as recall, understanding, or application |
| `question` | string | Yes | Question text |
| `options` | object | Yes | Multiple choice options |
| `answer_key` | string | Yes | Correct option key |
| `explanation` | string | Yes | Explanation of the correct answer |
| `common_misconception` | string | No | Common mistake related to the question |
| `tags` | array | No | Searchable topic tags |
| `image_url` | string | No | Optional image URL for image-based questions |

## Difficulty values

Use one of the following values:

```text
easy
medium
hard
```

## Cognitive level values

Recommended values:

```text
recall
understanding
application
analysis
evaluation
creation
```

## JSON example

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
  "tags": ["function", "linear-function", "substitution"],
  "image_url": null
}
```

## CSV format

For CSV files, options can be stored in separate columns:

```csv
id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
```

Example:

```csv
MTK-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3, so f(4) = 11.","Students may forget to substitute x with 4.","function,linear-function,substitution",
```

## Image-based questions

For image-based questions, use the `image_url` field.

The first version of this project stores image references, not image files.

Questions that require diagrams, charts, tables, maps, or other visual context can use the optional `image_url` field.

For detailed guidance, read:

- [`docs/image-based-questions.md`](image-based-questions.md)

Example:

```json
{
  "id": "MTK-GEO-001",
  "subject": "Mathematics",
  "topic": "Geometry",
  "question": "Based on the image, what is the area of the triangle?",
  "image_url": "https://example.com/images/triangle-001.png"
}
```

## Content contribution notes

Please contribute only content that you created yourself, content that you have permission to share, or content that is clearly allowed for reuse.

## Future schema additions

Possible future fields:

- `curriculum`,
- `grade_level`,
- `competency`,
- `prerequisite_topics`,
- `estimated_time_seconds`,
- `misconception_code`,
- `source_license`,
- `locale`,
- and `language`.
