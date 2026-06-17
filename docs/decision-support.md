# Decision Support

This document explains the first decision support utility in Edutive Open Learning Toolkit.

The current scope is Simple Additive Weighting, also known as SAW. The goal is to provide a transparent weighted ranking utility for small educational analysis examples.

## Related documents

Read these first:

- [`decision-support-input-format.md`](decision-support-input-format.md)
- [`learning-analysis.md`](learning-analysis.md)

## What the utility does

The SAW utility ranks records by:

1. reading numeric criteria values,
2. normalizing each criterion,
3. applying criterion weights,
4. calculating a final score,
5. sorting records from highest score to lowest score.

## Benefit and cost criteria

SAW uses two criterion types.

| Type | Meaning | Example |
|---|---|---|
| `benefit` | Higher value is better | completion rate |
| `cost` | Lower value is better | error count |

Example benefit criterion:

```json
{
  "key": "completion_rate",
  "weight": 0.2,
  "type": "benefit"
}
```

Example cost criterion:

```json
{
  "key": "topic_score_average",
  "weight": 0.3,
  "type": "cost"
}
```

In this example, `topic_score_average` is treated as cost when the ranking goal is to prioritize participants who need review first.

## Input records

```json
[
  {
    "id": "P001",
    "label": "Participant 1",
    "values": {
      "topic_score_average": 60,
      "completion_rate": 90,
      "time_spent_total_seconds": 400,
      "review_need_score": 80
    }
  }
]
```

## Criteria input

```json
[
  {
    "key": "review_need_score",
    "weight": 0.4,
    "type": "benefit"
  },
  {
    "key": "topic_score_average",
    "weight": 0.3,
    "type": "cost"
  }
]
```

## Programmatic usage

```ts
import { rankWithSaw } from "@edutive/question-tools";

const ranking = rankWithSaw(records, criteria);

console.log(ranking.results);
```

## Output example

```json
{
  "criteria": [
    {
      "key": "review_need_score",
      "weight": 0.4,
      "type": "benefit"
    }
  ],
  "results": [
    {
      "rank": 1,
      "id": "P001",
      "label": "Participant 1",
      "score": 0.875,
      "normalized_values": {
        "review_need_score": 1
      },
      "values": {
        "review_need_score": 80
      }
    }
  ]
}
```

## Example data

Fictional example data is available in:

```text
examples/decision-support/sample-records.json
examples/decision-support/sample-criteria.json
```

## Simple workflow

```text
1. Generate topic summaries.
2. Transform summaries into decision support records.
3. Define criteria and weights.
4. Run the SAW ranking utility.
5. Review the ranked output.
6. Use the output as a transparent helper, not as an automatic final decision.
```

## Current limitation

This utility is a baseline method only. It does not replace educator judgment and does not make final decisions automatically.

Future releases may add more methods such as TOPSIS or Weighted Product.

## Recommended checks

```bash
npm run check
npm test
npm run validate:examples
```
