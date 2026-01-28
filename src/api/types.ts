export interface UserResponse {
  premium: boolean;
}

export interface FactorGradesNow {
  Growth: { current: string };
  Momentum: { current: string };
  Profitability: { current: string };
  Revisions: { current: string };
  Valuation: { current: string };
}

export interface FactorGrades3m {
  Growth: string;
  Momentum: string;
  Profitability: string;
  Revisions: string;
  Valuation: string;
}

export type FactorGrades6m = { data: Array<[string, string]> };

export interface QuantRanking {
  industry: string;
  sector: string;
  rankings: {
    industry_specific: { rank: number; total: number };
    overall: { rank: number; total: number };
    sector: { rank: number; total: number };
  };
}

export interface RatingsSummary {
  Quant: { rating: string; score: number };
  SA_Analysts: { rating: string; score: number };
  Wall_Street: { rating: string; score: number };
}
