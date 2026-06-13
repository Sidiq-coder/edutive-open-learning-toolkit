# Practice Result Format

This document defines the initial practice result format for Edutive Open Learning Toolkit.

A practice result record represents one answer submitted during a practice, pre-test, post-test, quiz, or similar learning activity. This format is intentionally simple so it can be used by the future learning analysis engine.

## Why this format exists

Question datasets explain what is being asked. Practice result records explain how a participant answered those questions.

Together, they allow the toolkit to calculate simple learning summaries such as:

- score by topic,
- number of correct answers,
- number of attempted questions,
- percentage per topic,
- and later, possible learning gaps.

## Recommended storage choice

For the future Edutive application, the recommended default database is **PostgreSQL**.

Recommended setup:

| Use case | Recommended storage |
|---|---|
| Main web application | PostgreSQL |
| Offline/local prototype | SQLite |
| Large analytics later | PostgreSQL first, then consider analytics storage if needed |

Why PostgreSQL first:

- The project has relational data: participants, questions, attempts, answers, topics, and summaries.
- PostgreSQL works well for relational tables and can still store flexible metadata with `jsonb`.
- It is a good fit for a future backend API, dashboard, and reporting workflow.

Why SQLite is still useful:

- SQLite is simple for local prototypes.
- SQLite is useful for offline-first school demos.
- SQLite can be used before a full server is ready.

Recommended early approach:

```text
Start with JSON files in this repository.
Use SQLite for offline/local demos.
Use PostgreSQL when building the real web backend.
```

The format in this document is database-neutral. It can be stored in JSON files, SQLite, PostgreSQL, or another database later.

## Required fields

Every practice result record should include these fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `participant_id` | string | Yes | Fictional or system-generated participant identifier |
| `question_id` | string | Yes | ID of the answered question |
| `selected_answer` | string | Yes | Selected option key, such as `A`, `B`, `C`, or `D` |
| `is_correct` | boolean | Yes | Whether the selected answer is correct |

## Optional fields

These fields are optional but useful:

| Field | Type | Required | Description |
|---|---|---|---|
| `answered_at` | string | No | ISO-like date and time string |
| `time_spent_seconds` | number | No | Time spent on the question |
| `attempt_number` | number | No | Attempt number for repeated practice |
| `session_id` | string | No | Practice session identifier |
| `source` | string | No | Source activity, such as `pre-test`, `post-test`, or `practice` |

## Field details

### `participant_id`

Use a fictional or system-generated identifier.

Good examples:

```text
P001
P002
learner-demo-001
```

Avoid using real names, emails, phone numbers, addresses, or other personal information in sample files.

### `question_id`

This field must match a question `id` from the question dataset.

Example:

```json
{
  "question_id": "MTK-SAMPLE-001"
}
```

The analysis engine can use this field to find the question topic, difficulty, tags, and correct answer.

### `selected_answer`

Use one of the answer option keys:

```text
A
B
C
D
```

### `is_correct`

This field can be stored directly or calculated by comparing `selected_answer` with the question dataset `answer_key`.

For early examples, store it directly to keep the format simple.

## Single record example

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

## Multiple records example

```json
[
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
  },
  {
    "participant_id": "P001",
    "question_id": "MTK-SAMPLE-002",
    "selected_answer": "A",
    "is_correct": false,
    "answered_at": "2026-06-12T09:01:00Z",
    "time_spent_seconds": 42,
    "attempt_number": 1,
    "session_id": "SESSION-DEMO-001",
    "source": "practice"
  }
]
```

## How result records connect to questions

A practice result record connects to a question through `question_id`.

Example question:

```json
{
  "id": "MTK-SAMPLE-001",
  "subject": "Mathematics",
  "topic": "Arithmetic",
  "answer_key": "A"
}
```

Example result:

```json
{
  "participant_id": "P001",
  "question_id": "MTK-SAMPLE-001",
  "selected_answer": "A",
  "is_correct": true
}
```

The future topic summary utility can join these records in memory:

```text
practice result question_id -> question dataset id -> topic
```

Then it can summarize results by topic.

## Correctness rule

There are two possible approaches.

### Store correctness directly

```json
{
  "selected_answer": "A",
  "is_correct": true
}
```

This is simple and useful for examples.

### Calculate correctness from the question dataset

```text
selected_answer === answer_key
```

This is useful when the system wants to avoid storing duplicated correctness data.

For v0.4.0, the recommended approach is:

```text
Allow `is_correct` in input examples, but keep the analysis utility able to calculate or verify it later.
```

## Privacy-friendly sample data

Sample data must use fictional identifiers only.

Use:

```text
P001
P002
SESSION-DEMO-001
```

Do not use:

```text
real names
email addresses
phone numbers
school IDs
home addresses
```

This keeps the repository safe for open source examples.

## Suggested PostgreSQL table design later

This is only a recommendation for the future backend. It is not required for the current repository.

```sql
CREATE TABLE practice_results (
  id UUID PRIMARY KEY,
  participant_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  attempt_number INTEGER DEFAULT 1,
  session_id TEXT,
  source TEXT,
  metadata JSONB
);
```

Recommended future tables:

```text
questions
practice_sessions
practice_results
topic_summaries
```

Keep question metadata mostly relational, but allow flexible extra metadata through `metadata JSONB` when needed.

## Suggested SQLite usage for offline demos

For an offline prototype, a similar structure can be stored in SQLite.

SQLite is useful when the app needs a local database file and does not need a full database server.

Example direction:

```text
Use SQLite for school/offline demo mode.
Sync or export to PostgreSQL later when server mode is available.
```

## Future analysis output

A future topic summary may produce output like:

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

This document only defines the input result format. The summary utility is handled in a separate issue.
