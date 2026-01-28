import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RatingsSummaryCard } from "./index";
import * as hooks from "../../hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../hooks", () => ({
  useRatingsSummary: vi.fn(),
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

describe("RatingsSummaryCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display skeleton loader while data is loading", () => {
    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderWithQueryClient(<RatingsSummaryCard />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render ratings summary data when available", async () => {
    const mockData = {
      SA_Analysts: { rating: "HOLD", score: 3.0 },
      Wall_Street: { rating: "BUY", score: 4.13 },
      Quant: { rating: "HOLD", score: 3.47 },
    };

    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<RatingsSummaryCard />);

    await waitFor(() => {
      expect(screen.getByText(/sa analysts/i)).toBeInTheDocument();
      expect(screen.getByText(/wall street/i)).toBeInTheDocument();
      expect(screen.getByText(/quant/i)).toBeInTheDocument();

      expect(screen.getAllByText("HOLD")).toHaveLength(2);
      expect(screen.getByText("BUY")).toBeInTheDocument();
    });
  });

  it("should display error message when data fetch fails", () => {
    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    } as any);

    renderWithQueryClient(<RatingsSummaryCard />);

    expect(screen.getByText(/Unable to load ratings data/)).toBeInTheDocument();
  });

  it("should format scores correctly", async () => {
    const mockData = {
      Quant: { rating: "HOLD", score: 3.47 },
    };

    vi.spyOn(hooks, "useRatingsSummary").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<RatingsSummaryCard />);

    await waitFor(() => {
      expect(screen.getByText("3.47")).toBeInTheDocument();
    });
  });
});
