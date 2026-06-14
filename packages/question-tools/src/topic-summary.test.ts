import { describe, expect, it } from "vitest";
import { createTopicSummary, type PracticeResultRecord } from "./topic-summary.js";
import type { QuestionItem } from "./types.js";

const questions: QuestionItem[] = [
  {
    id: "MTK-SAMPLE-001",
    subject: "Mathematics",
    topic: "Arithmetic",
    subtopic: "Order of Operations",
    difficulty: "easy",
    cognitive_level: "application",
    question: "What is the value of 6 + 4 x 2?",
    options: {
      A: "14",
      B: "20",
      C: "16",
      D: "12"
    },
    answer_key: "A",
    explanation: "Multiplication is done before addition.",
    tags: ["arithmetic"]
  },
  {
    id: "MTK-SAMPLE-002",
    subject: "Mathematics",
    topic: "Fractions",
    subtopic: "Equivalent Fractions",
    difficulty: "easy",
    cognitive_level: "understanding",
    question: "Which fraction is equivalent to 1/2?",
    options: {
      A: "2/3",
      B: "2/4",
      C: "3/5",
      D: "4/6"
    },
    answer_key: "B",
    explanation: "2/4 is equivalent to 1/2.",
    tags: ["fractions"]
  },
  {
    id: "SCI-SAMPLE-001",
    subject: "Science",
    topic: "Ecosystem",
    subtopic: "Food Chain",
    difficulty: "easy",
    cognitive_level: "understanding",
    question: "What is the role of a producer?",
    options: {
      A: "To make its own food",
      B: "To hunt other animals",
      C: "To break down dead organisms",
      D: "To consume only meat"
    },
    answer_key: "A",
    explanation: "A producer can make its own food.",
    tags: ["ecosystem"]
  }
];

describe("createTopicSummary", () => {
  it("creates topic summaries from valid records", () => {
    const results: PracticeResultRecord[] = [
      {
        participant_id: "P001",
        question_id: "MTK-SAMPLE-001",
        selected_answer: "A",
        is_correct: true
      },
      {
        participant_id: "P001",
        question_id: "MTK-SAMPLE-002",
        selected_answer: "A",
        is_correct: false
      }
    ];

    const summary = createTopicSummary(questions, results, { participant_id: "P001" });

    expect(summary).toEqual({
      participant_id: "P001",
      topics: [
        {
          topic: "Arithmetic",
          total: 1,
          correct: 1,
          percentage: 100
        },
        {
          topic: "Fractions",
          total: 1,
          correct: 0,
          percentage: 0
        }
      ],
      unmatched_question_ids: []
    });
  });

  it("returns an empty summary for empty input", () => {
    const summary = createTopicSummary(questions, []);

    expect(summary).toEqual({
      participant_id: undefined,
      topics: [],
      unmatched_question_ids: []
    });
  });

  it("tracks records without matching question metadata", () => {
    const summary = createTopicSummary(questions, [
      {
        participant_id: "P001",
        question_id: "UNKNOWN-001",
        selected_answer: "A",
        is_correct: true
      }
    ]);

    expect(summary.topics).toEqual([]);
    expect(summary.unmatched_question_ids).toEqual(["UNKNOWN-001"]);
  });

  it("groups records by multiple topics", () => {
    const results: PracticeResultRecord[] = [
      {
        participant_id: "P001",
        question_id: "MTK-SAMPLE-001",
        selected_answer: "A"
      },
      {
        participant_id: "P001",
        question_id: "SCI-SAMPLE-001",
        selected_answer: "A"
      }
    ];

    const summary = createTopicSummary(questions, results);

    expect(summary.topics).toEqual([
      {
        topic: "Arithmetic",
        total: 1,
        correct: 1,
        percentage: 100
      },
      {
        topic: "Ecosystem",
        total: 1,
        correct: 1,
        percentage: 100
      }
    ]);
  });

  it("calculates percentages for mixed correct and incorrect records", () => {
    const results: PracticeResultRecord[] = [
      {
        participant_id: "P001",
        question_id: "MTK-SAMPLE-001",
        selected_answer: "A"
      },
      {
        participant_id: "P001",
        question_id: "MTK-SAMPLE-001",
        selected_answer: "B"
      }
    ];

    const summary = createTopicSummary(questions, results);

    expect(summary.topics).toEqual([
      {
        topic: "Arithmetic",
        total: 2,
        correct: 1,
        percentage: 50
      }
    ]);
  });
});
