import type { GeneratedQuestionPreview } from "../types";
import { Card } from "./ui/Card";

interface DatasetPreviewProps {
  preview: GeneratedQuestionPreview;
}

export function DatasetPreview({ preview }: DatasetPreviewProps) {
  const datasetPreview = JSON.stringify(
    {
      subject: preview.subject,
      topic: preview.topic,
      difficulty: preview.difficulty,
      cognitive_level: preview.cognitiveLevel,
      answer_key: "D",
      image_url: null
    },
    null,
    2
  );

  return (
    <Card className="dataset-preview">
      <span className="eyebrow">Dataset Ready</span>
      <h2>Output terstruktur</h2>
      <p>Setiap draft yang disetujui diarahkan ke format dataset Edutive agar bisa divalidasi dan diekspor.</p>
      <pre>{datasetPreview}</pre>
    </Card>
  );
}
