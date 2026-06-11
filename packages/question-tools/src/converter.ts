import { parseQuestionCsv } from "./csv.js";
import { validateQuestionDataset } from "./validator.js";

export interface ConvertCsvToJsonOptions {
  validate?: boolean;
}

export interface ConvertCsvToJsonResult {
  json: string;
  totalQuestions: number;
}

export function convertCsvToJson(
  csvContent: string,
  options: ConvertCsvToJsonOptions = { validate: true }
): ConvertCsvToJsonResult {
  const questions = parseQuestionCsv(csvContent);

  if (options.validate !== false) {
    const validationResult = validateQuestionDataset(questions, {
      pathFormatter: (index) => `row ${index + 2}`
    });

    if (!validationResult.valid) {
      const message = validationResult.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("\n");

      throw new Error(`CSV validation failed before conversion:\n${message}`);
    }
  }

  return {
    json: JSON.stringify(questions, null, 2),
    totalQuestions: questions.length
  };
}
