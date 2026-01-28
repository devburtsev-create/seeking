import { render, screen, waitFor } from "@testing-library/react";
import App from "./app";
import * as hooks from "../hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../hooks", () => ({
  useUser: vi.fn(),
  useQuantRanking: vi.fn(),
  useRatingsSummary: vi.fn(),
  useFactorGradesNow: vi.fn(),
  useFactorGrades3m: vi.fn(),
  useFactorGrades6m: vi.fn(),
}));

describe("App - Premium User Access", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show only QuantRankingCard for non-premium users", async () => {
    vi.spyOn(hooks, "useUser").mockReturnValue({
      data: { premium: false },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: {
        sector: "Tech",
        industry: "Hardware",
        rankings: {
          overall: { rank: 825, total: 4455 },
          sector: { rank: 105, total: 552 },
          industry_specific: { rank: 8, total: 28 },
        },
      },
      isLoading: false,
      error: null,
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Quant Ranking")).toBeInTheDocument();
      expect(screen.queryByText("Ratings Summary")).not.toBeInTheDocument();
      expect(screen.queryByText("Factor Grades")).not.toBeInTheDocument();
    });
  });

  it("should show all cards for premium users", async () => {
    vi.spyOn(hooks, "useUser").mockReturnValue({
      data: { premium: true },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: {
        sector: "Tech",
        industry: "Hardware",
        rankings: {
          overall: { rank: 825, total: 4455 },
          sector: { rank: 105, total: 552 },
          industry_specific: { rank: 8, total: 28 },
        },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: {
        SA_Analysts: { rating: "HOLD", score: 3.0 },
        Wall_Street: { rating: "BUY", score: 4.13 },
        Quant: { rating: "HOLD", score: 3.47 },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: {
        Growth: { current: "D-" },
        Momentum: { current: "B+" },
        Profitability: { current: "A+" },
        Revisions: { current: "B-" },
        Valuation: { current: "F" },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades3m").mockReturnValue({
      data: {},
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades6m").mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Quant Ranking")).toBeInTheDocument();
      expect(screen.getByText("Ratings Summary")).toBeInTheDocument();
      expect(screen.getByText("Factor Grades")).toBeInTheDocument();
    });
  });

  it("should maintain correct card order (QuantRanking first, then Ratings, then Factors)", async () => {
    vi.spyOn(hooks, "useUser").mockReturnValue({
      data: { premium: true },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: {
        sector: "Tech",
        industry: "Hardware",
        rankings: {
          overall: { rank: 825, total: 4455 },
          sector: { rank: 105, total: 552 },
          industry_specific: { rank: 8, total: 28 },
        },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: {
        Quant: { rating: "HOLD", score: 3.47 },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: {
        Growth: { current: "D-" },
      },
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades3m").mockReturnValue({
      data: {},
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades6m").mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<App />);

    const headings = await screen.findAllByRole("heading", { level: 2 });

    const titles = headings.map((h) => h.textContent);

    expect(titles).toEqual([
      "Quant Ranking",
      "Ratings Summary",
      "Factor Grades",
    ]);
  });
});
