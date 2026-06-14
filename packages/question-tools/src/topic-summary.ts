import type { OptionKey, QuestionItem } from "./types.js";

export interface PracticeResultRecord {
  participant_id: string;
  question_id: string;
  selected_answer: OptionKey;
  is_correct?: boolean;
  answered_at?: string;
  time_spent_seconds?: number;
  attempt_number?: number;
  session_id?: string;
  source?: string;
}

export interface TopicSummaryItem {
  topic: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface TopicSummaryResult {
  participant_id?: string;
  topics: TopicSummaryItem[];
  unmatched_question_ids: string[];
}

export interface CreateTopicSummaryOptions {
  participant_id?: string;
}

function calculatePercentage(correct: number, total: number): number {
  if (total === 0) {
    return 0;
  }

  return Math.round((correct / total) * 100);
}

function resolveCorrectness(result: PracticeResultRecord, question: QuestionItem): boolean {
  if (typeof result.is_correct === "boolean") {
    return result.is_correct;
  }

  return result.selected_answer === question.answer_key;
}

export function createTopicSummary(
  questions: QuestionItem[],
  results: PracticeResultRecord[],
  options: CreateTopicSummaryOptions = {}
): TopicSummaryResult {
  const questionById = new Map<string, QuestionItem>();

  for (const question of questions) {
    questionById.set(question.id, question);
  }

  const topicMap = new Map<string, { total: number; correct: number }>();
  const unmatchedQuestionIds = new Set<string>();

  for (const result of results) {
    const question = questionById.get(result.question_id);

    if (!question) {
      unmatchedQuestionIds.add(result.question_id);
      continue;
    }

    const current = topicMap.get(question.topic) ?? { total: 0, correct: 0 };
    current.total += 1;

    if (resolveCorrectness(result, question)) {
      current.correct += 1;
    }

    topicMap.set(question.topic, current);
  }

  const topics = Array.from(topicMap.entries())
    .map(([topic, value]) => ({
      topic,
      total: value.total,
      correct: value.correct,
      percentage: calculatePercentage(value.correct, value.total)
    }))
    .sort((a, b) => a.topic.localeCompare(b.topic));

  return {
    participant_id: options.participant_id,
    topics,
    unmatched_question_ids: Array.from(unmatchedQuestionIds).sort()
  };
}
