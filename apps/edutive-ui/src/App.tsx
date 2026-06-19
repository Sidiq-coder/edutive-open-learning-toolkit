import { DatasetPreview } from "./components/DatasetPreview";
import { FeatureCard } from "./components/FeatureCard";
import { GenerateForm } from "./components/GenerateForm";
import { Navbar } from "./components/layout/Navbar";
import { QuestionPreview } from "./components/QuestionPreview";
import { ButtonLink } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { SectionHeader } from "./components/ui/SectionHeader";
import { Workflow } from "./components/Workflow";
import { featureItems, navigationItems, workflowSteps } from "./data/navigation";
import { generatedQuestionPreview } from "./data/questionPreview";

export function App() {
  return (
    <div className="app-shell" id="top">
      <Navbar items={navigationItems} />

      <main>
        <section className="hero-section">
          <div className="hero-section__content">
            <span className="eyebrow">Edutive Open Learning Toolkit</span>
            <h1>React UI untuk generate soal dan pembelajaran adaptif.</h1>
            <p>
              Antarmuka ini menggantikan preview HTML statis dengan React, TypeScript, data-driven sections, dan reusable components.
              Fokus awalnya adalah alur Generate Soal yang menghasilkan draft soal terstruktur dan dataset-ready.
            </p>
            <div className="button-row">
              <ButtonLink href="#generate">Lihat Generate Soal</ButtonLink>
              <ButtonLink href="#features" variant="secondary">Jelajahi Fitur</ButtonLink>
            </div>
          </div>

          <Card className="hero-section__preview">
            <QuestionPreview preview={generatedQuestionPreview} />
          </Card>
        </section>

        <section className="page-section" id="features">
          <SectionHeader
            label="Feature Map"
            title="Menu fitur utama"
            copy="Setiap menu mengenalkan bagian sistem yang dibangun secara bertahap dari generate soal sampai rekomendasi."
          />
          <div className="feature-grid">
            {featureItems.map((feature) => (
              <FeatureCard feature={feature} key={feature.id} />
            ))}
          </div>
        </section>

        <section className="page-section generate-layout" id="generate">
          <GenerateForm />
          <div className="generate-layout__right">
            <QuestionPreview preview={generatedQuestionPreview} />
            <DatasetPreview />
          </div>
        </section>

        <section className="page-section" id="dataset">
          <SectionHeader
            label="Dataset Tools"
            title="Dari draft soal ke dataset tervalidasi"
            copy="Soal yang sudah direview diarahkan ke format JSON/CSV agar bisa dipakai untuk bank soal, validasi, dan analisis lanjutan."
          />
          <div className="metric-grid">
            <Card><strong>JSON / CSV</strong><span>Format dataset terbuka</span></Card>
            <Card><strong>Validator</strong><span>Cek field dan answer key</span></Card>
            <Card><strong>Converter</strong><span>CSV ke JSON terstruktur</span></Card>
          </div>
        </section>

        <section className="page-section" id="analysis">
          <SectionHeader
            label="Learning Analysis"
            title="Analisis hasil latihan per topik"
            copy="Practice result dapat dihubungkan dengan question metadata untuk menghitung ringkasan topik dan melihat area yang perlu diperkuat."
          />
          <div className="metric-grid">
            <Card><strong>Topic Summary</strong><span>Total, benar, dan persentase</span></Card>
            <Card><strong>Practice Records</strong><span>Jawaban peserta terstruktur</span></Card>
            <Card><strong>Unmatched IDs</strong><span>Deteksi data yang tidak cocok</span></Card>
          </div>
        </section>

        <section className="page-section" id="decision">
          <SectionHeader
            label="Decision Support"
            title="Ranking transparan dengan SAW"
            copy="Decision support memberi baseline untuk memprioritaskan review berdasarkan kriteria benefit dan cost."
          />
          <div className="metric-grid">
            <Card><strong>Benefit</strong><span>Nilai lebih tinggi lebih baik</span></Card>
            <Card><strong>Cost</strong><span>Nilai lebih rendah lebih baik</span></Card>
            <Card><strong>Weighted Score</strong><span>Skor akhir terurut</span></Card>
          </div>
        </section>

        <section className="page-section" id="recommendation">
          <SectionHeader
            label="Recommendation"
            title="Rekomendasi belajar berbasis skor topik"
            copy="Recommendation utility memberi saran prioritas, topik yang perlu review, dan difficulty latihan berikutnya."
          />
          <div className="metric-grid">
            <Card><strong>Weak Topics</strong><span>Topik di bawah threshold</span></Card>
            <Card><strong>Strong Topics</strong><span>Topik yang sudah kuat</span></Card>
            <Card><strong>Next Practice</strong><span>Difficulty yang disarankan</span></Card>
          </div>
        </section>

        <section className="page-section" id="roadmap">
          <SectionHeader
            label="Workflow"
            title="Alur produk dari request sampai insight"
            copy="UI ini disusun supaya setiap bagian sistem bisa dikembangkan bertahap tanpa kehilangan arah produk."
          />
          <Workflow steps={workflowSteps} />
        </section>
      </main>
    </div>
  );
}
