import type { QuestionItem } from "./types.js";

const REQUIRED_COLUMNS = [
  "id",
  "subject",
  "topic",
  "difficulty",
  "question",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "answer_key",
  "explanation"
] as const;

function splitCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === "\"" && insideQuotes && nextChar === "\"") {
      current += "\"";
      i += 1;
      continue;
    }

    if (char === "\"") {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseTags(value: string | undefined): string[] | undefined {
  if (value === undefined || value.trim().length === 0) {
    return undefined;
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function emptyToUndefined(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

function emptyToNull(value: string | undefined): string | null {
  if (value === undefined) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export function parseQuestionCsv(csvContent: string): QuestionItem[] {
  const normalized = csvContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new Error("CSV file is empty.");
  }

  const headers = splitCsvLine(lines[0]).map((header) => header.trim());

  for (const column of REQUIRED_COLUMNS) {
    if (!headers.includes(column)) {
      throw new Error(`Missing required CSV column: ${column}`);
    }
  }

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return {
      id: row.id,
      subject: row.subject,
      topic: row.topic,
      subtopic: emptyToUndefined(row.subtopic),
      difficulty: row.difficulty as QuestionItem["difficulty"],
      cognitive_level: emptyToUndefined(row.cognitive_level) as QuestionItem["cognitive_level"],
      question: row.question,
      options: {
        A: row.option_a,
        B: row.option_b,
        C: row.option_c,
        D: row.option_d
      },
      answer_key: row.answer_key as QuestionItem["answer_key"],
      explanation: row.explanation,
      common_misconception: emptyToUndefined(row.common_misconception),
      tags: parseTags(row.tags),
      image_url: emptyToNull(row.image_url)
    };
  });
}
