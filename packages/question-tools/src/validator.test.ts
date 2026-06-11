import { describe, expect, it } from "vitest";
import type { QuestionItem } from "./types.js";
import { validateQuestionDataset } from "./validator.js";

const validQuestion: QuestionItem = {
  id: "MTK-001",
  subject: "Mathematics",
  topic: "Functions",
  subtopic: "Linear Functions",
  difficulty: "medium",
  cognitive_level: "application",
  question: "If f(x) = 2x + 3, what is f(4)?",
  options: {
    A: "8",
    B: "9",
    C: "10",
    D: "11"
  },
  answer_key: "D",
  explanation: "Substitute x = 4 into f(x) = 2x + 3, so f(4) = 11.",
  common_misconception: "Students may forget to substitute x with 4.",
  tags: ["function", "linear-function", "substitution"],
  image_url: null
};

describe("validateQuestionDataset", () => {
  it("returns valid result for a valid question dataset", () => {
    const result = validateQuestionDataset([validQuestion]);

    expect(result.valid).toBe(true);
    expect(result.totalQuestions).toBe(1);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects non-array datasets", () => {
    const result = validateQuestionDataset({ questions: [validQuestion] });

    expect(result.valid).toBe(false);
    expect(result.totalQuestions).toBe(0);
    expect(result.issues).toContainEqual({
      path: "$",
      message: "Dataset must be an array of question items."
    });
  });

  it("reports missing required string fields", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      question: ""
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].question",
      message: "This field is required and must be a non-empty string."
    });
  });

  it("reports invalid difficulty values", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      difficulty: "advanced"
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].difficulty",
      message: "Difficulty must be one of: easy, medium, hard."
    });
  });

  it("reports invalid answer key values", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      answer_key: "E"
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].answer_key",
      message: "Answer key must be one of: A, B, C, D."
    });
  });

  it("reports missing multiple choice options", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      options: {
        A: "8",
        B: "9",
        C: "10",
        D: ""
      }
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].options.D",
      message: "Option must be a non-empty string."
    });
  });

  it("reports invalid tags", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      tags: ["function", ""]
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].tags[1]",
      message: "Tag must be a non-empty string."
    });
  });

  it("reports invalid image_url values", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      image_url: 123
    };

    const result = validateQuestionDataset([invalidQuestion]);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "[0].image_url",
      message: "Image URL must be a string or null."
    });
  });

  it("supports custom path formatter", () => {
    const invalidQuestion: unknown = {
      ...validQuestion,
      answer_key: "E"
    };

    const result = validateQuestionDataset([invalidQuestion], {
      pathFormatter: (index) => `row ${index + 2}`
    });

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "row 2.answer_key",
      message: "Answer key must be one of: A, B, C, D."
    });
  });
});
