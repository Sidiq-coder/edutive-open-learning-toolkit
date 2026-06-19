import type { FeatureItem } from "../types";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <a href={feature.href} className="feature-card" id={feature.id}>
      <Card>
        <Badge>{feature.label}</Badge>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </Card>
    </a>
  );
}
