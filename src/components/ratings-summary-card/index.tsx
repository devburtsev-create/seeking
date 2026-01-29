import { memo } from "react";
import { useRatingsSummary } from "../../hooks";
import { Card } from "../ui";
import { RatingsSkeleton } from "./ratings-skeleton";
import styles from "./ratings.module.css";

const formatLabel = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const truncateTo2 = (num: number) => {
  return (Math.floor(num * 100) / 100).toFixed(2);
};

const RatingsSummaryCardComponent = () => {
  const { data, isLoading, error } = useRatingsSummary();

  if (isLoading) {
    return (
      <Card cardTitle="Ratings Summary">
        <RatingsSkeleton />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card cardTitle="Ratings Summary">
        <div className={styles.error}>Unable to load ratings data</div>
      </Card>
    );
  }

  return (
    <Card cardTitle="Ratings Summary">
      <div className={styles.ratings}>
        {Object.entries(data).map(([key, { rating, score }]) => (
          <div key={key} className={styles["ratings-item"]}>
            <span className={styles["ratings-item__label"]}>
              {formatLabel(key)}
            </span>
            <span className={styles["ratings-item__rating"]}>{rating}</span>
            <span className={styles["ratings-item__score"]}>
              {truncateTo2(score)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const RatingsSummaryCard = memo(RatingsSummaryCardComponent);
