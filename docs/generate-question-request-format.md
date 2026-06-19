# Generate Question Request Format

This document defines the request format for the future Generate Soal workflow in Edutive Open Learning Toolkit.

A generate question request describes what kind of question draft should be created before it is reviewed and converted into the final Edutive question dataset format.

## Purpose

The request format helps make question generation consistent.

It defines:

- the subject,
- the topic,
- the difficulty,
- the cognitive level,
- the number of questions,
- the question style,
- the language,
- and extra instructions.

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `subject` | string | Yes | Subject name, such as `Mathematics` |
| `topic` | string | Yes | Main topic for the question |
| `difficulty` | string | Yes | `easy`, `medium`, or `hard` |
| `cognitive_level` | string | Yes | Cognitive level such as `application` |
| `question_count` | number | Yes | Number of questions requested |
| `question_style` | string | Yes | Output style, such as `multiple-choice` |
| `language` | string | Yes | Output language, such as `id` or `en` |

## Optional fields

| Field | Type | Description |
|---|---|---|
| `subtopic` | string | More specific topic area |
| `tags` | array | Suggested tags for generated questions |
| `reference_text` | string | Reference material or source text to guide the question |
| `additional_instructions` | string | Extra generation instructions |
| `include_explanation` | boolean | Whether to include answer explanation |
| `include_common_misconception` | boolean | Whether to include common misconception |
| `include_image_context` | boolean | Whether the request may include image-based context |

## JSON example

```json
{
  "subject": "Mathematics",
  "topic": "Linear Functions",
  "subtopic": "Function Evaluation",
  "difficulty": "medium",
  "cognitive_level": "application",
  "question_count": 5,
  "question_style": "multiple-choice",
  "language": "id",
  "tags": ["function", "linear-function", "substitution"],
  "include_explanation": true,
  "include_common_misconception": true,
  "include_image_context": false,
  "additional_instructions": "Create SNBT-style multiple-choice questions with clear reasoning."
}
```

## Mapping to dataset fields

A generate request maps to the final question dataset format.

| Request field | Dataset field |
|---|---|
| `subject` | `subject` |
| `topic` | `topic` |
| `subtopic` | `subtopic` |
| `difficulty` | `difficulty` |
| `cognitive_level` | `cognitive_level` |
| `tags` | `tags` |
| `language` | Used for question text and explanation language |
| `question_style` | Used to decide output structure |
| `include_explanation` | Controls `explanation` |
| `include_common_misconception` | Controls `common_misconception` |
| `include_image_context` | May affect `image_url` or image-based wording |

## Recommended workflow

```text
1. User submits generate question request.
2. System creates question drafts.
3. Reviewer checks answer key, explanation, and misconception.
4. Approved drafts are converted to Edutive question dataset format.
5. Dataset validator checks the final output.
```

## Notes

The request format is not the final question dataset. It is only the input contract for the Generate Soal workflow.
