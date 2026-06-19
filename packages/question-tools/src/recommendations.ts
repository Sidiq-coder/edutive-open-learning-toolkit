export type RecommendationDifficulty = "easy" | "medium" | "hard";
export type ReviewPriority = "low" | "medium" | "high";

export interface TopicScoreInput {
  topic: string;
  percentage: number;
}

export interface RecommendationInput {
  participant_id: string;
  topic_scores: TopicScoreInput[];
  weak_topic_threshold?: number;
  strong_topic_threshold?: number;
}

export interface TopicRecommendation {
  topic: string;
  percentage: number;
  priority: ReviewPriority;
  recommended_difficulty: RecommendationDifficulty;
  action: string;
}

export interface RecommendationResult {
  participant_id: string;
  weak_topics: string[];
  strong_topics: string[];
  recommendations: TopicRecommendation[];
}

function getPriority(percentage: number): ReviewPriority {
  if (percentage < 50) {
    return "high";
  }

  if (percentage < 75) {
    return "medium";
  }

  return "low";
}

function getDifficulty(percentage: number): RecommendationDifficulty {
  if (percentage < 50) {
    return "easy";
  }

  if (percentage < 75) {
    return "medium";
  }

  return "hard";
}

function getAction(topic: string, priority: ReviewPriority, difficulty: RecommendationDifficulty): string {
  if (priority === "high") {
    return `Review ${topic} from the basics and practice ${difficulty} questions.`;
  }

  if (priority === "medium") {
    return `Strengthen ${topic} with guided ${difficulty} practice.`;
  }

  return `Maintain ${topic} mastery with ${difficulty} enrichment practice.`;
}

export function createRecommendations(input: RecommendationInput): RecommendationResult {
  const weakTopicThreshold = input.weak_topic_threshold ?? 60;
  const strongTopicThreshold = input.strong_topic_threshold ?? 80;

  const weakTopics = input.topic_scores
    .filter((topic) => topic.percentage < weakTopicThreshold)
    .map((topic) => topic.topic)
    .sort();

  const strongTopics = input.topic_scores
    .filter((topic) => topic.percentage >= strongTopicThreshold)
    .map((topic) => topic.topic)
    .sort();

  const recommendations = input.topic_scores
    .map((topic) => {
      const priority = getPriority(topic.percentage);
      const recommendedDifficulty = getDifficulty(topic.percentage);

      return {
        topic: topic.topic,
        percentage: topic.percentage,
        priority,
        recommended_difficulty: recommendedDifficulty,
        action: getAction(topic.topic, priority, recommendedDifficulty)
      };
    })
    .sort((a, b) => {
      if (a.percentage !== b.percentage) {
        return a.percentage - b.percentage;
      }

      return a.topic.localeCompare(b.topic);
    });

  return {
    participant_id: input.participant_id,
    weak_topics: weakTopics,
    strong_topics: strongTopics,
    recommendations
  };
}
