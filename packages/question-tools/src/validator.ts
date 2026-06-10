import type { QuestionItem, ValidationIssue, ValidationResult } from "./types.js";

const REQUIRED_STRING_FIELDS = [
  "id",
  "subject",
  "topic",
  "difficulty",
  "question",
  "answer_key",
  "explanation"
] as const;

const ALLOWED_DIFFICULTIES = ["easy", "medium", "hard"];
const ALLOWED_ANSWER_KEYS = ["A", "B", "C", "D"];
const ALLOWED_COGNITIVE_LEVELS = [
  "recall",
  "understanding",
  "application",
  "analysis",
  "evaluation",
  "creation"
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function addIssue(issues: ValidationIssue[], path: string, message: string): void {
  issues.push({ path, message });
}

function validateQuestion(question: unknown, index: number): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const basePath = `[${index}]`;

  if (!isObject(question)) {
    addIssue(issues, basePath, "Question item must be an object.");
    return issues;
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = question[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      addIssue(issues, `${basePath}.${field}`, "This field is required and must be a non-empty string.");
    }
  }

  if (typeof question.difficulty === "string" && !ALLOWED_DIFFICULTIES.includes(question.difficulty)) {
    addIssue(issues, `${basePath}.difficulty`, "Difficulty must be one of: easy, medium, hard.");
  }

  if (typeof question.answer_key === "string" && !ALLOWED_ANSWER_KEYS.includes(question.answer_key)) {
    addIssue(issues, `${basePath}.answer_key`, "Answer key must be one of: A, B, C, D.");
  }

  if (
    typeof question.cognitive_level === "string" &&
    !ALLOWED_COGNITIVE_LEVELS.includes(question.cognitive_level)
  ) {
    addIssue(
      issues,
      `${basePath}.cognitive_level`,
      "Cognitive level is not supported by the current schema."
    );
  }

  if (!isObject(question.options)) {
    addIssue(issues, `${basePath}.options`, "Options must be an object with A, B, C, and D.");
  } else {
    for (const key of ALLOWED_ANSWER_KEYS) {
      const value = question.options[key];
      if (typeof value !== "string" || value.trim().length === 0) {
        addIssue(issues, `${basePath}.options.${key}`, "Option must be a non-empty string.");
      }
    }
  }

  if (question.tags !== undefined) {
    if (!Array.isArray(question.tags)) {
      addIssue(issues, `${basePath}.tags`, "Tags must be an array of strings.");
    } else {
      question.tags.forEach((tag, tagIndex) => {
        if (typeof tag !== "string" || tag.trim().length === 0) {
          addIssue(issues, `${basePath}.tags[${tagIndex}]`, "Tag must be a non-empty string.");
        }
      });
    }
  }

  if (question.image_url !== undefined && question.image_url !== null && typeof question.image_url !== "string") {
    addIssue(issues, `${basePath}.image_url`, "Image URL must be a string or null.");
  }

  return issues;
}

export function validateQuestionDataset(dataset: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!Array.isArray(dataset)) {
    return {
      valid: false,
      totalQuestions: 0,
      issues: [
        {
          path: "$",
          message: "Dataset must be an array of question items."
        }
      ]
    };
  }

  dataset.forEach((question, index) => {
    issues.push(...validateQuestion(question, index));
  });

  return {
    valid: issues.length === 0,
    totalQuestions: dataset.length,
    issues
  };
}

export type { QuestionItem, ValidationIssue, ValidationResult };
