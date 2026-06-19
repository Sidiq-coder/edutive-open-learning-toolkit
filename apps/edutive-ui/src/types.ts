export interface NavigationItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface QuestionOption {
  key: "A" | "B" | "C" | "D";
  text: string;
  isCorrect?: boolean;
}

export interface GeneratedQuestionPreview {
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  cognitiveLevel: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
  misconception: string;
}
