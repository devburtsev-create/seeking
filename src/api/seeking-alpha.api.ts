import { get } from "./base";
import type {
  UserResponse,
  FactorGradesNow,
  FactorGrades3m,
  FactorGrades6m,
  QuantRanking,
  RatingsSummary,
} from "./types";

export const seekingAlphaApi = {
  user: () => get<UserResponse>("/user"),
  factorGradesNow: () => get<FactorGradesNow>("/factor-grades/now"),
  factorGrades3m: () => get<FactorGrades3m>("/factor-grades/3m"),
  factorGrades6m: () => get<FactorGrades6m>("/factor-grades/6m"),
  quantRanking: () => get<QuantRanking>("/quant-ranking"),
  ratingsSummary: () => get<RatingsSummary>("/ratings-summary"),
};
