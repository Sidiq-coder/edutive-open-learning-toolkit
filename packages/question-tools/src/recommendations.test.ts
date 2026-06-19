import { describe, expect, it } from "vitest";
import { createRecommendations } from "./recommendations.js";

describe("createRecommendations", () => {
  it("creates output from topic scores", () => {
    const result = createRecommendations({
      participant_id: "P001",
      topic_scores: [
        { topic: "Arithmetic", percentage: 40 },
        { topic: "Fractions", percentage: 70 },
        { topic: "Geometry", percentage: 90 }
      ]
    });

    expect(result.participant_id).toBe("P001");
    expect(result.weak_topics).toEqual(["Arithmetic"]);
    expect(result.strong_topics).toEqual(["Geometry"]);
    expect(result.recommendations.map((item) => item.topic)).toEqual([
      "Arithmetic",
      "Fractions",
      "Geometry"
    ]);
  });

  it("supports custom thresholds", () => {
    const result = createRecommendations({
      participant_id: "P001",
      weak_topic_threshold: 75,
      strong_topic_threshold: 85,
      topic_scores: [
        { topic: "Arithmetic", percentage: 70 },
        { topic: "Geometry", percentage: 86 }
      ]
    });

    expect(result.weak_topics).toEqual(["Arithmetic"]);
    expect(result.strong_topics).toEqual(["Geometry"]);
  });

  it("suggests practice level based on score", () => {
    const result = createRecommendations({
      participant_id: "P001",
      topic_scores: [
        { topic: "Arithmetic", percentage: 40 },
        { topic: "Fractions", percentage: 70 },
        { topic: "Geometry", percentage: 90 }
      ]
    });

    expect(result.recommendations.map((item) => item.recommended_difficulty)).toEqual([
      "easy",
      "medium",
      "hard"
    ]);
  });

  it("returns empty lists for empty topic scores", () => {
    const result = createRecommendations({
      participant_id: "P001",
      topic_scores: []
    });

    expect(result).toEqual({
      participant_id: "P001",
      weak_topics: [],
      strong_topics: [],
      recommendations: []
    });
  });
});
