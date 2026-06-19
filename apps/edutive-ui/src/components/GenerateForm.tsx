import type { ChangeEvent } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export interface GenerateFormState {
  subject: string;
  topic: string;
  count: string;
  difficulty: "easy" | "medium" | "hard";
  cognitiveLevel: string;
  notes: string;
}

interface GenerateFormProps {
  value: GenerateFormState;
  onChange: (value: GenerateFormState) => void;
}

export function GenerateForm({ value, onChange }: GenerateFormProps) {
  function updateField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    onChange({
      ...value,
      [event.target.name]: event.target.value
    });
  }

  return (
    <Card className="generate-form">
      <span className="eyebrow">Generate Soal</span>
      <h2>Konfigurasi</h2>
      <p>Input awal untuk membuat draft soal yang siap direview.</p>

      <form className="form-grid">
        <label>
          Subject
          <select name="subject" value={value.subject} onChange={updateField}>
            <option>Mathematics</option>
            <option>Science</option>
            <option>Indonesian Language</option>
            <option>English</option>
          </select>
        </label>

        <div className="form-row">
          <label>
            Topic
            <input name="topic" value={value.topic} onChange={updateField} />
          </label>
          <label>
            Count
            <input name="count" value={value.count} onChange={updateField} inputMode="numeric" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Difficulty
            <select name="difficulty" value={value.difficulty} onChange={updateField}>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </label>
          <label>
            Cognitive Level
            <select name="cognitiveLevel" value={value.cognitiveLevel} onChange={updateField}>
              <option>recall</option>
              <option>understanding</option>
              <option>application</option>
              <option>analysis</option>
            </select>
          </label>
        </div>

        <label>
          Notes
          <textarea name="notes" value={value.notes} onChange={updateField} />
        </label>

        <div className="button-row">
          <Button type="button">Create Draft</Button>
          <Button type="button" variant="secondary">Import Reference</Button>
        </div>
      </form>
    </Card>
  );
}
