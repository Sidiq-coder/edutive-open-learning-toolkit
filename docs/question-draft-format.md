# Question Draft Format

This document defines the draft format for new questions before they are approved into the Edutive dataset.

A draft is not final data. It is a reviewable version that helps contributors check quality before export.

## Why drafts are needed

New questions should be reviewed before they enter a question bank.

The review process should check:

- question clarity,
- answer key correctness,
- option quality,
- explanation quality,
- common misconception quality,
- dataset metadata,
- and validation readiness.

## Review status values

| Status | Meaning |
|---|---|
| `draft` | Newly created and not reviewed yet |
| `needs-review` | Needs reviewer attention |
| `approved` | Ready to be exported to dataset format |
| `rejected` | Should not be used |

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `draft_id` | string | Yes | Unique draft identifier |
| `status` | string | Yes | Draft review status |
| `question` | object | Yes | Question content following Edutive-like structure |

## Optional fields

| Field | Type | Description |
|---|---|---|
| `source_request_id` | string | ID of the request that produced the draft |
| `review_notes` | array | Reviewer notes |
| `created_at` | string | Draft creation timestamp |
| `updated_at` | string | Last update timestamp |

## JSON example

```json
{
  "draft_id": "DRAFT-MTK-001",
  "source_request_id": "REQ-MTK-001",
  "status": "needs-review",
  "question": {
    "id": "MTK-DRAFT-001",
    "subject": "Mathematics",
    "topic": "Linear Functions",
    "subtopic": "Function Evaluation",
    "difficulty": "medium",
    "cognitive_level": "application",
    "question": "Jika f(x) = 2x + 3, nilai f(4) adalah...",
    "options": {
      "A": "8",
      "B": "9",
      "C": "10",
      "D": "11"
    },
    "answer_key": "D",
    "explanation": "Substitusi x = 4 ke f(x) = 2x + 3, sehingga f(4) = 11.",
    "common_misconception": "Siswa dapat lupa mengganti x dengan 4 sebelum menghitung.",
    "tags": ["function", "linear-function", "substitution"],
    "image_url": null
  },
  "review_notes": [
    "Check whether the distractors are plausible."
  ],
  "created_at": "2026-06-19T09:00:00Z",
  "updated_at": "2026-06-19T09:00:00Z"
}
```

## From draft to dataset

Only drafts with status `approved` should be exported into final dataset files.

The export process should:

```text
1. Select approved drafts.
2. Extract the `question` object.
3. Add it to JSON or CSV dataset files.
4. Run dataset validation.
5. Review validation output.
```

## Notes

The draft format is intentionally close to the Edutive question dataset format, but it adds review fields so the workflow can remain safe and auditable.
