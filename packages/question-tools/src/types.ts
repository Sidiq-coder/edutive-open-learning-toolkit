export type Difficulty = "easy" | "medium" | "hard";

export type CognitiveLevel =
  | "recall"
  | "understanding"
  | "application"
  | "analysis"
  | "evaluation"
  | "creation";

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuestionItem {
  id: string;
  subject: string;
  topic: string;
  subtopic?: string;
  difficulty: Difficulty;
  cognitive_level?: CognitiveLevel;
  question: string;
  options: QuestionOptions;
  answer_key: OptionKey;
  explanation: string;
  common_misconception?: string;
  tags?: string[];
  image_url?: string | null;
}

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  totalQuestions: number;
  issues: ValidationIssue[];
}
