import "./App.css";
import {
  FactorGradesCard,
  QuantRankingCard,
  RatingsSummaryCard,
} from "../components";

function App() {
  return (
    <>
      <RatingsSummaryCard />
      <FactorGradesCard />
      <QuantRankingCard />
    </>
  );
}

export default App;
