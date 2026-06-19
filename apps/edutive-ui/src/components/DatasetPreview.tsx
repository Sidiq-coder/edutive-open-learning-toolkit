import { Card } from "./ui/Card";

const datasetPreview = `{
  "subject": "Mathematics",
  "topic": "Fungsi Linear",
  "difficulty": "medium",
  "cognitive_level": "application",
  "answer_key": "D",
  "image_url": null
}`;

export function DatasetPreview() {
  return (
    <Card className="dataset-preview">
      <span className="eyebrow">Dataset Ready</span>
      <h2>Output terstruktur</h2>
      <p>Setiap draft yang disetujui diarahkan ke format dataset Edutive agar bisa divalidasi dan diekspor.</p>
      <pre>{datasetPreview}</pre>
    </Card>
  );
}
