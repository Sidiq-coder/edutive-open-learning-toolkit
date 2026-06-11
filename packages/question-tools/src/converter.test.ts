import { describe, expect, it } from "vitest";
import { convertCsvToJson } from "./converter.js";

const validCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,D,"Substitute x = 4 into f(x) = 2x + 3.","Students may forget to substitute x with 4.","function,linear-function,substitution",
`;

describe("convertCsvToJson", () => {
  it("converts valid CSV content into formatted JSON", () => {
    const result = convertCsvToJson(validCsv);

    expect(result.totalQuestions).toBe(1);
    expect(result.json).toContain('\n    "id": "MTK-001"');

    const parsed = JSON.parse(result.json);

    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
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

  it("throws an error when CSV validation fails", () => {
    const invalidCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-BAD-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,E,"Substitute x = 4 into f(x) = 2x + 3.","Invalid answer key example.","function,linear-function",
`;

    expect(() => convertCsvToJson(invalidCsv)).toThrow(
      "CSV validation failed before conversion:"
    );
  });

  it("can skip validation when requested", () => {
    const invalidCsv = `id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-BAD-001,Mathematics,Functions,Linear Functions,medium,application,"If f(x) = 2x + 3, what is f(4)?",8,9,10,11,E,"Substitute x = 4 into f(x) = 2x + 3.","Invalid answer key example.","function,linear-function",
`;

    const result = convertCsvToJson(invalidCsv, { validate: false });
    const parsed = JSON.parse(result.json);

    expect(result.totalQuestions).toBe(1);
    expect(parsed[0].answer_key).toBe("E");
  });
});
