import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FactorGradesCard } from "./index";
import * as hooks from "../../hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../hooks", () => ({
  useFactorGradesNow: vi.fn(),
  useFactorGrades3m: vi.fn(),
  useFactorGrades6m: vi.fn(),
}));

const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={mockQueryClient}>
      {component}
    </QueryClientProvider>,
  );
};

describe("FactorGradesCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display skeleton loader while data is loading", () => {
    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades3m").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades6m").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderWithQueryClient(<FactorGradesCard />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render factor grades data when available", async () => {
    const mockNowData = {
      Growth: { current: "D-" },
      Momentum: { current: "B+" },
      Profitability: { current: "A+" },
      Revisions: { current: "B-" },
      Valuation: { current: "F" },
    };

    const mockM3Data = {
      Growth: "C-",
      Momentum: "C-",
      Profitability: "A+",
      Revisions: "C",
      Valuation: "F",
    };

    const mockM6Data = [
      ["Growth", "D"],
      ["Momentum", "C"],
      ["Profitability", "A+"],
      ["Revisions", "C"],
      ["Valuation", "F"],
    ];

    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: mockNowData,
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades3m").mockReturnValue({
      data: mockM3Data,
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades6m").mockReturnValue({
      data: mockM6Data,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<FactorGradesCard />);

    await waitFor(() => {
      expect(screen.getByText("Valuation")).toBeInTheDocument();
      expect(screen.getByText("Growth")).toBeInTheDocument();
      expect(screen.getByText("Profitability")).toBeInTheDocument();
      expect(screen.getByText("Momentum")).toBeInTheDocument();
      expect(screen.getByText("Revisions")).toBeInTheDocument();
    });
  });

  it("should display error message when data fetch fails", () => {
    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    } as any);

    vi.spyOn(hooks, "useFactorGrades3m").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    vi.spyOn(hooks, "useFactorGrades6m").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<FactorGradesCard />);

    expect(
      screen.getByText(/Unable to load factor grades data/),
    ).toBeInTheDocument();
  });

  it("should maintain factor order (Valuation, Growth, Profitability, Momentum, Revisions)", async () => {
    const mockNowData = {
      Growth: { current: "D-" },
      Momentum: { current: "B+" },
      Profitability: { current: "A+" },
      Revisions: { current: "B-" },
      Valuation: { current: "F" },
    };

    vi.spyOn(hooks, "useFactorGradesNow").mockReturnValue({
      data: mockNowData,
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

    renderWithQueryClient(<FactorGradesCard />);

    await waitFor(() => {
      const labels = screen.getAllByText(
        /^(Valuation|Growth|Profitability|Momentum|Revisions)$/,
      );
      expect(labels[0]).toHaveTextContent("Valuation");
      expect(labels[1]).toHaveTextContent("Growth");
      expect(labels[2]).toHaveTextContent("Profitability");
      expect(labels[3]).toHaveTextContent("Momentum");
      expect(labels[4]).toHaveTextContent("Revisions");
    });
  });
});
