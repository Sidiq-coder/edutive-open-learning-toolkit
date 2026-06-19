import type { GeneratedQuestionPreview } from "../types";

export const generatedQuestionPreview: GeneratedQuestionPreview = {
  subject: "Mathematics",
  topic: "Fungsi Linear",
  difficulty: "medium",
  cognitiveLevel: "application",
  question: "Jika f(x) = 2x + 3, nilai f(4) adalah...",
  options: [
    { key: "A", text: "8" },
    { key: "B", text: "9" },
    { key: "C", text: "10" },
    { key: "D", text: "11", isCorrect: true }
  ],
  explanation: "Substitusi x = 4 ke f(x) = 2x + 3, sehingga f(4) = 2(4) + 3 = 11.",
  misconception: "Siswa dapat lupa melakukan substitusi nilai x terlebih dahulu atau keliru pada urutan operasi."
};
