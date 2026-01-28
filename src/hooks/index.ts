import { useQuery } from "@tanstack/react-query";
import { seekingAlphaApi } from "../api/seeking-alpha.api";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: seekingAlphaApi.user,
  });
}

export function useFactorGradesNow() {
  return useQuery({
    queryKey: ["factorGradesNow"],
    queryFn: seekingAlphaApi.factorGradesNow,
  });
}

export function useFactorGrades3m() {
  return useQuery({
    queryKey: ["factorGrades3m"],
    queryFn: seekingAlphaApi.factorGrades3m,
  });
}

export function useFactorGrades6m() {
  return useQuery({
    queryKey: ["factorGrades6m"],
    queryFn: async () => {
      const res = await seekingAlphaApi.factorGrades6m();
      return res.data;
    },
  });
}

export function useQuantRanking() {
  return useQuery({
    queryKey: ["quantRanking"],
    queryFn: seekingAlphaApi.quantRanking,
  });
}

export function useRatingsSummary() {
  return useQuery({
    queryKey: ["ratingsSummary"],
    queryFn: seekingAlphaApi.ratingsSummary,
  });
}
