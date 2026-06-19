import type { WorkflowStep } from "../types";

interface WorkflowProps {
  steps: WorkflowStep[];
}

export function Workflow({ steps }: WorkflowProps) {
  return (
    <div className="workflow">
      {steps.map((step, index) => (
        <article className="workflow__step" key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
