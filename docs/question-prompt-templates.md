# Question Prompt Templates

This document provides reusable prompt templates for the Generate Soal workflow.

The goal is to keep question drafts consistent with the Edutive dataset format.

## Template 1: Multiple-choice question draft

```text
Create {question_count} multiple-choice questions.

Subject: {subject}
Topic: {topic}
Subtopic: {subtopic}
Difficulty: {difficulty}
Cognitive level: {cognitive_level}
Language: {language}
Question style: {question_style}

Each question must include:
- question text
- four options: A, B, C, D
- answer_key
- explanation
- common_misconception
- tags
- image_url set to null if no image is used

Additional instructions:
{additional_instructions}
```

## Template 2: Explanation review

```text
Review the explanation for this question.

Question:
{question}

Options:
A. {option_a}
B. {option_b}
C. {option_c}
D. {option_d}

Answer key: {answer_key}

Check whether the explanation:
- proves why the answer is correct
- is clear for learners
- uses step-by-step reasoning when needed
- avoids vague statements

Return an improved explanation only.
```

## Template 3: Common misconception

```text
Identify a likely common misconception for this question.

Question:
{question}

Correct answer: {answer_key}

Write one concise misconception that explains a likely reasoning mistake.
Avoid generic phrases such as "students do not understand".
```

## Template 4: Dataset-ready JSON

```text
Format the reviewed question as a JSON object using this structure:

{
  "id": "",
  "subject": "",
  "topic": "",
  "subtopic": "",
  "difficulty": "easy | medium | hard",
  "cognitive_level": "recall | understanding | application | analysis | evaluation | creation",
  "question": "",
  "options": {
    "A": "",
    "B": "",
    "C": "",
    "D": ""
  },
  "answer_key": "A | B | C | D",
  "explanation": "",
  "common_misconception": "",
  "tags": [],
  "image_url": null
}
```

## Template 5: Reviewer checklist

```text
Review this question draft and check:

- Is the question clear?
- Are all options plausible?
- Is the answer key correct?
- Is the explanation accurate?
- Is the common misconception useful?
- Are subject, topic, difficulty, and cognitive level correct?
- Are tags useful?
- Is image_url valid or null?

Return:
- review_status: approved | needs-review | rejected
- review_notes: list of notes
```

## Notes

These templates are starting points. They should be adapted based on the subject, topic, and evaluation context.
