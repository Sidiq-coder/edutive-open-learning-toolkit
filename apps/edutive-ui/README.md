# Edutive UI Preview

React + TypeScript UI preview for Edutive Open Learning Toolkit.

This app replaces the earlier static HTML previews with a reusable component-based interface.

## Focus

The current UI focuses on:

- project landing page,
- Generate Soal workflow,
- question draft preview,
- dataset-ready output preview,
- learning analysis introduction,
- decision support introduction,
- recommendation introduction.

## Tech stack

- React
- TypeScript
- Vite
- CSS with design tokens
- Reusable components
- Data-driven sections

## Run locally

```bash
cd apps/edutive-ui
npm install
npm run dev
```

Then open the local Vite URL.

## Build

```bash
npm run build
```

## Component structure

```text
src/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── DatasetPreview.tsx
│   ├── FeatureCard.tsx
│   ├── GenerateForm.tsx
│   ├── QuestionPreview.tsx
│   └── Workflow.tsx
├── data/
├── styles/
├── App.tsx
├── main.tsx
└── types.ts
```

## Note

This app is still a prototype. Backend integration, authentication, persistent storage, and real generation logic are not implemented yet.
