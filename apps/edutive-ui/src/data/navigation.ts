import type { FeatureItem, NavigationItem, WorkflowStep } from "../types";

export const navigationItems: NavigationItem[] = [
  { label: "Generate Soal", href: "#generate" },
  { label: "Dataset", href: "#dataset" },
  { label: "Analysis", href: "#analysis" },
  { label: "Decision", href: "#decision" },
  { label: "Recommendation", href: "#recommendation" },
  { label: "Roadmap", href: "#roadmap" }
];

export const featureItems: FeatureItem[] = [
  {
    id: "generate",
    label: "Current Focus",
    title: "Generate Soal",
    description: "Input kebutuhan soal, hasilkan draft, review jawaban, pembahasan, dan miskonsepsi sebelum masuk dataset.",
    href: "#generate"
  },
  {
    id: "dataset",
    label: "Dataset",
    title: "Question Dataset Tools",
    description: "Format JSON/CSV, validasi dataset, parser CSV, dan converter untuk bank soal terstruktur.",
    href: "#dataset"
  },
  {
    id: "analysis",
    label: "Analysis",
    title: "Learning Analysis",
    description: "Menghubungkan hasil latihan dengan metadata soal untuk membuat ringkasan skor per topik.",
    href: "#analysis"
  },
  {
    id: "decision",
    label: "Decision",
    title: "Decision Support",
    description: "Utility SAW untuk ranking transparan berdasarkan kriteria benefit dan cost.",
    href: "#decision"
  },
  {
    id: "recommendation",
    label: "Recommendation",
    title: "Recommendation Engine",
    description: "Rekomendasi sederhana berbasis skor topik: topik lemah, prioritas review, dan difficulty latihan.",
    href: "#recommendation"
  }
];

export const workflowSteps: WorkflowStep[] = [
  { title: "Request", description: "User menentukan subject, topic, difficulty, jumlah soal, bahasa, dan gaya soal." },
  { title: "Draft", description: "Sistem membuat draft soal lengkap dengan options, answer key, explanation, dan misconception." },
  { title: "Review", description: "Reviewer mengecek kualitas soal, opsi jawaban, pembahasan, dan metadata." },
  { title: "Validate", description: "Draft yang disetujui divalidasi sesuai format dataset Edutive." },
  { title: "Export", description: "Soal siap diekspor menjadi JSON atau CSV untuk bank soal." },
  { title: "Analyze", description: "Hasil latihan dapat dianalisis untuk insight dan rekomendasi belajar." }
];
