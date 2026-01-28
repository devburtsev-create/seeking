import { QueryClientProvider } from "@tanstack/react-query";
import {
  FactorGradesCard,
  QuantRankingCard,
  RatingsSummaryCard,
  Skeleton,
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
        <Skeleton width={200} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
