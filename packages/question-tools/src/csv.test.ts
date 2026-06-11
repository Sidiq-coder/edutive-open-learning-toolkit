import { describe, expect, it } from "vitest";
import { parseQuestionCsv } from "./csv.js";
import { validateQuestionDataset } from "./validator.js";

const validCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3.","Students may forget to substitute x with 4.","function,linear-function,substitution",
`;

describe("parseQuestionCsv", () => {
  it("parses valid CSV content into question objects", () => {
    const questions = parseQuestionCsv(validCsv);

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
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
      explanation: "Substitute x = 4 into f(x) = 2x + 3.",
      common_misconception: "Students may forget to substitute x with 4.",
      tags: ["function", "linear-function", "substitution"],
      image_url: null
    });
  });

  it("throws a clear error for empty CSV files", () => {
    expect(() => parseQuestionCsv("")).toThrow("CSV file is empty.");
  });

  it("throws a clear error when required columns are missing", () => {
    const csv = `id,subject,topic
MTK-001,Mathematics,Functions
`;

    expect(() => parseQuestionCsv(csv)).toThrow("Missing required CSV column:");
  });

  it("can be validated using validateQuestionDataset", () => {
    const questions = parseQuestionCsv(validCsv);
    const result = validateQuestionDataset(questions, {
      pathFormatter: (index) => `row ${index + 2}`
    });

    expect(result.valid).toBe(true);
    expect(result.totalQuestions).toBe(1);
    expect(result.issues).toHaveLength(0);
  });

  it("reports CSV row numbers through validator path formatter", () => {
    const invalidCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-BAD-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,E,"Substitute x = 4 into f(x) = 2x + 3.","Invalid answer key example.","function,linear-function",
`;

    const questions = parseQuestionCsv(invalidCsv);
    const result = validateQuestionDataset(questions, {
      pathFormatter: (index) => `row ${index + 2}`
    });

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "row 2.answer_key",
      message: "Answer key must be one of: A, B, C, D."
    });
  });
});
