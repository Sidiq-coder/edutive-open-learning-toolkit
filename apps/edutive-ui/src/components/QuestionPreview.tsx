import type { GeneratedQuestionPreview } from "../types";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";

interface QuestionPreviewProps {
  preview: GeneratedQuestionPreview;
}

export function QuestionPreview({ preview }: QuestionPreviewProps) {
  return (
    <Card className="question-preview">
      <div className="metadata-row">
        <Badge>{preview.subject}</Badge>
        <Badge>{preview.topic}</Badge>
        <Badge>{preview.difficulty}</Badge>
        <Badge>{preview.cognitiveLevel}</Badge>
      </div>

      <p className="question-text">{preview.question}</p>

      <div className="option-list">
        {preview.options.map((option) => (
          <div className={`option-item ${option.isCorrect ? "option-item--correct" : ""}`} key={option.key}>
            <span>{option.key}</span>
            <p>{option.text}</p>
          </div>
        ))}
      </div>

      <div className="review-notes">
        <div>
          <strong>Pembahasan</strong>
          <p>{preview.explanation}</p>
        </div>
        <div>
          <strong>Miskonsepsi Umum</strong>
          <p>{preview.misconception}</p>
        </div>
      </div>
    </Card>
  );
}
