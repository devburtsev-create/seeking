import { memo } from "react";
import { useQuantRanking } from "../../hooks";
import { Card } from "../ui";
import styles from "./quant-ranking-card.module.css";
import { QuantRankingSkeleton } from "./quant-ranking-skeleton";

const QuantRankingCardComponent = () => {
  const { data, isLoading, error } = useQuantRanking();

  if (isLoading) {
    return (
      <Card cardTitle="Quant Ranking">
        <QuantRankingSkeleton />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card cardTitle="Quant Ranking">
        <div className={styles.error}>Unable to load data</div>
      </Card>
    );
  }

  const { sector, industry, rankings } = data;

  return (
    <Card cardTitle="Quant Ranking">
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Sector</span>
          <span className={styles.value}>{sector}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Industry</span>
          <span className={styles.value}>{industry}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Ranked Overall</span>
          <span className={styles.value}>
            <span className={styles.highlight}>{rankings.overall.rank}</span>{" "}
            out of{" "}
            <span className={styles.highlight}>{rankings.overall.total}</span>
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Ranked in Sector</span>
          <span className={styles.value}>
            <span className={styles.highlight}>{rankings.sector.rank}</span> out
            of <span className={styles.highlight}>{rankings.sector.total}</span>
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Ranked in Industry</span>
          <span className={styles.value}>
            <span className={styles.highlight}>
              {rankings.industry_specific.rank}
            </span>{" "}
            out of{" "}
            <span className={styles.highlight}>
              {rankings.industry_specific.total}
            </span>
          </span>
        </div>

        <a
          href="#"
          className={styles.link}
          aria-label="View detailed quant ratings"
        >
          Quant Ratings Beat The Market »
        </a>
      </div>
    </Card>
  );
};

export const QuantRankingCard = memo(QuantRankingCardComponent);
