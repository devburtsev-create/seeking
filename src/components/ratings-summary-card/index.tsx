import { memo } from "react";
import { useRatingsSummary } from "../../hooks";
import { Card } from "../ui";
import { RatingsSkeleton } from "./ratings-skeleton";
import styles from "./ratings.module.css";

const formatLabel = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
          <dl key={key} className={styles["ratings-item"]}>
            <dt className={styles["ratings-item__label"]}>
              {formatLabel(key)}
            </dt>
            <dd className={styles["ratings-item__rating"]}>{rating}</dd>
            <dd className={styles["ratings-item__score"]}>
              {Number(score).toFixed(2)}
            </dd>
          </dl>
        ))}
      </div>
    </Card>
  );
};

export const RatingsSummaryCard = memo(RatingsSummaryCardComponent);
