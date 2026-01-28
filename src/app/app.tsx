import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { QuantRankingCard } from "../components";
import { queryClient } from "../api/query-client";
import { useUser } from "../hooks";
import styles from "./app.module.css";

const RatingsSummaryCard = lazy(() =>
  import("../components").then((module) => ({
    default: module.RatingsSummaryCard,
  })),
);
const FactorGradesCard = lazy(() =>
  import("../components").then((module) => ({
    default: module.FactorGradesCard,
  })),
);

function AppContent() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className={styles.container}>
        <QuantRankingCard />
      </div>
    );
  }

  const isPremium = user?.premium ?? false;

  return (
    <div className={styles.container}>
      <QuantRankingCard />

      {isPremium && (
        <Suspense fallback={<div />}>
          <RatingsSummaryCard />
          <FactorGradesCard />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
