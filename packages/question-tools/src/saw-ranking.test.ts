import { describe, expect, it } from "vitest";
import { rankWithSaw, type SawCriterion, type SawRecord } from "./saw-ranking.js";

const records: SawRecord[] = [
  {
    id: "P001",
    label: "Participant 1",
    values: {
      topic_score_average: 60,
      completion_rate: 90,
      time_spent_total_seconds: 400
    }
  },
  {
    id: "P002",
    label: "Participant 2",
    values: {
      topic_score_average: 80,
      completion_rate: 70,
      time_spent_total_seconds: 300
    }
  },
  {
    id: "P003",
    label: "Participant 3",
    values: {
      topic_score_average: 70,
      completion_rate: 80,
      time_spent_total_seconds: 200
    }
  }
];

const criteria: SawCriterion[] = [
  {
    key: "topic_score_average",
    weight: 0.5,
    type: "benefit"
  },
  {
    key: "completion_rate",
    weight: 0.3,
    type: "benefit"
  },
  {
    key: "time_spent_total_seconds",
    weight: 0.2,
    type: "cost"
  }
];

describe("rankWithSaw", () => {
  it("returns ranked output sorted by score", () => {
    const result = rankWithSaw(records, criteria);

    expect(result.results.map((record) => record.id)).toEqual(["P003", "P002", "P001"]);
    expect(result.results.map((record) => record.rank)).toEqual([1, 2, 3]);
  });

  it("normalizes benefit criteria using maximum value", () => {
    const result = rankWithSaw(records, criteria);
    const participant2 = result.results.find((record) => record.id === "P002");

    expect(participant2?.normalized_values.topic_score_average).toBe(1);
  });

  it("normalizes cost criteria using minimum positive value", () => {
    const result = rankWithSaw(records, criteria);
    const participant3 = result.results.find((record) => record.id === "P003");

    expect(participant3?.normalized_values.time_spent_total_seconds).toBe(1);
  });

  it("handles missing values as zero", () => {
    const result = rankWithSaw(
      [
        {
          id: "P001",
          values: {
            topic_score_average: 80
          }
        }
      ],
      criteria
    );

    expect(result.results[0]?.normalized_values.completion_rate).toBe(0);
    expect(result.results[0]?.normalized_values.time_spent_total_seconds).toBe(0);
  });

  it("uses id as a stable tie breaker", () => {
    const result = rankWithSaw(
      [
        {
          id: "P002",
          values: {
            topic_score_average: 80
          }
        },
        {
          id: "P001",
          values: {
            topic_score_average: 80
          }
        }
      ],
      [
        {
          key: "topic_score_average",
          weight: 1,
          type: "benefit"
        }
      ]
    );

    expect(result.results.map((record) => record.id)).toEqual(["P001", "P002"]);
  });
});
