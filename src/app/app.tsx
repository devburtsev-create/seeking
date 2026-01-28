import { QueryClientProvider } from "@tanstack/react-query";
import {
  FactorGradesCard,
  QuantRankingCard,
  RatingsSummaryCard,
} from "../components";
import { queryClient } from "../api/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <RatingsSummaryCard />
        <FactorGradesCard />
        <QuantRankingCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
