interface SectionHeaderProps {
  label: string;
  title: string;
  copy?: string;
}

export function SectionHeader({ label, title, copy }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}
