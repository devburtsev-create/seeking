import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuantRankingCard } from "./index";
import * as hooks from "../../hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../hooks", () => ({
  useQuantRanking: vi.fn(),
  useUser: vi.fn(),
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

describe("QuantRankingCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display skeleton loader while data is loading", () => {
    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderWithQueryClient(<QuantRankingCard />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render quant ranking data when available", async () => {
    const mockData = {
      sector: "Information Technology",
      industry: "Technology Hardware, Storage and Peripherals",
      rankings: {
        overall: { rank: 825, total: 4455 },
        sector: { rank: 105, total: 552 },
        industry_specific: { rank: 8, total: 28 },
      },
    };

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<QuantRankingCard />);

    await waitFor(() => {
      expect(screen.getByText("Information Technology")).toBeInTheDocument();
      expect(screen.getByText(/825.*out of.*4455/)).toBeInTheDocument();
    });
  });

  it("should display error message when data fetch fails", () => {
    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    } as any);

    renderWithQueryClient(<QuantRankingCard />);

    expect(screen.getByText(/Unable to load data/)).toBeInTheDocument();
  });

  it("should render all ranking sections", async () => {
    const mockData = {
      sector: "Tech",
      industry: "Hardware",
      rankings: {
        overall: { rank: 825, total: 4455 },
        sector: { rank: 105, total: 552 },
        industry_specific: { rank: 8, total: 28 },
      },
    };

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<QuantRankingCard />);

    await waitFor(() => {
      expect(screen.getByText("Sector")).toBeInTheDocument();
      expect(screen.getByText("Industry")).toBeInTheDocument();
      expect(screen.getByText("Ranked Overall")).toBeInTheDocument();
      expect(screen.getByText("Ranked in Sector")).toBeInTheDocument();
      expect(screen.getByText("Ranked in Industry")).toBeInTheDocument();
    });
  });

  it("should have proper accessibility attributes", async () => {
    const mockData = {
      sector: "Tech",
      industry: "Hardware",
      rankings: {
        overall: { rank: 825, total: 4455 },
        sector: { rank: 105, total: 552 },
        industry_specific: { rank: 8, total: 28 },
      },
    };

    vi.spyOn(hooks, "useQuantRanking").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(<QuantRankingCard />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label");
  });
});
