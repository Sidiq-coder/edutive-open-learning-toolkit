# Recommendations

This document explains the first recommendation module in Edutive Open Learning Toolkit.

The current module maps topic scores into simple topic-level recommendation output.

## Related documents

- [`recommendation-input-format.md`](recommendation-input-format.md)
- [`learning-analysis.md`](learning-analysis.md)
- [`decision-support.md`](decision-support.md)

## What the module does

The recommendation module:

1. reads topic scores,
2. detects topics below a review threshold,
3. detects topics above a strong threshold,
4. suggests a practice level,
5. returns JSON-friendly output.

## Input example

```json
{
  "participant_id": "P001",
  "weak_topic_threshold": 60,
  "strong_topic_threshold": 80,
  "topic_scores": [
    {
      "topic": "Arithmetic",
      "percentage": 40
    },
    {
      "topic": "Fractions",
      "percentage": 70
    },
    {
      "topic": "Geometry",
      "percentage": 90
    }
  ]
}
```

## Programmatic usage

```ts
import { createRecommendations } from "@edutive/question-tools";

const result = createRecommendations(input);

console.log(result.recommendations);
```

## Output example

```json
{
  "participant_id": "P001",
  "weak_topics": ["Arithmetic"],
  "strong_topics": ["Geometry"],
  "recommendations": [
    {
      "topic": "Arithmetic",
      "percentage": 40,
      "priority": "high",
      "recommended_difficulty": "easy",
      "action": "Review Arithmetic from the basics and practice easy questions."
    }
  ]
}
```

## Example data

Example files are available in:

```text
examples/recommendations/sample-input.json
examples/recommendations/sample-output.json
```

## Simple workflow

```text
1. Validate question datasets.
2. Create topic summaries.
3. Prepare recommendation input.
4. Run the recommendation module.
5. Use the output as guidance for the next practice plan.
```

## Current limitation

This module is a baseline utility. It does not use machine learning yet.

Future versions may add prerequisite mapping, material recommendation, and adaptive practice sequencing.

## Recommended checks

```bash
npm run check
npm test
npm run validate:examples
```
