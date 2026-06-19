import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export function GenerateForm() {
  return (
    <Card className="generate-form">
      <span className="eyebrow">Generate Soal</span>
      <h2>Konfigurasi</h2>
      <p>Input awal untuk membuat draft soal yang siap direview.</p>

      <form className="form-grid">
        <label>
          Subject
          <select defaultValue="Mathematics">
            <option>Mathematics</option>
            <option>Science</option>
            <option>Indonesian Language</option>
            <option>English</option>
          </select>
        </label>

        <div className="form-row">
          <label>
            Topic
            <input defaultValue="Fungsi Linear" />
          </label>
          <label>
            Count
            <input defaultValue="5" inputMode="numeric" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Difficulty
            <select defaultValue="medium">
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </label>
          <label>
            Cognitive Level
            <select defaultValue="application">
              <option>recall</option>
              <option>understanding</option>
              <option>application</option>
              <option>analysis</option>
            </select>
          </label>
        </div>

        <label>
          Notes
          <textarea defaultValue="Buat soal pilihan ganda lengkap dengan jawaban dan pembahasan." />
        </label>

        <div className="button-row">
          <Button type="button">Create Draft</Button>
          <Button type="button" variant="secondary">Import Reference</Button>
        </div>
      </form>
    </Card>
  );
}
