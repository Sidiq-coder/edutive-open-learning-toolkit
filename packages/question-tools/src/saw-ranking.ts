export type SawCriterionType = "benefit" | "cost";

export interface SawCriterion {
  key: string;
  weight: number;
  type: SawCriterionType;
}

export interface SawRecord {
  id: string;
  label?: string;
  values: Record<string, number>;
}

export interface SawRankedRecord {
  rank: number;
  id: string;
  label?: string;
  score: number;
  normalized_values: Record<string, number>;
  values: Record<string, number>;
}

export interface SawRankingResult {
  criteria: SawCriterion[];
  results: SawRankedRecord[];
}

function roundScore(value: number): number {
  return Math.round(value * 10000) / 10000;
}

function getCriterionValues(records: SawRecord[], key: string): number[] {
  return records.map((record) => record.values[key] ?? 0);
}

function normalizeValue(value: number, values: number[], type: SawCriterionType): number {
  if (values.length === 0) {
    return 0;
  }

  if (type === "benefit") {
    const max = Math.max(...values);
    return max === 0 ? 0 : value / max;
  }

  const positiveValues = values.filter((item) => item > 0);

  if (positiveValues.length === 0 || value <= 0) {
    return 0;
  }

  const min = Math.min(...positiveValues);
  return min / value;
}

export function rankWithSaw(records: SawRecord[], criteria: SawCriterion[]): SawRankingResult {
  const ranked = records.map((record) => {
    const normalizedValues: Record<string, number> = {};
    let score = 0;

    for (const criterion of criteria) {
      const rawValue = record.values[criterion.key] ?? 0;
      const values = getCriterionValues(records, criterion.key);
      const normalized = normalizeValue(rawValue, values, criterion.type);

      normalizedValues[criterion.key] = roundScore(normalized);
      score += normalized * criterion.weight;
    }

    return {
      rank: 0,
      id: record.id,
      label: record.label,
      score: roundScore(score),
      normalized_values: normalizedValues,
      values: record.values
    };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.id.localeCompare(b.id);
  });

  return {
    criteria,
    results: ranked.map((record, index) => ({
      ...record,
      rank: index + 1
    }))
  };
}
