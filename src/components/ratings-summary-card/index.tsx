import { useRatingsSummary } from "../../hooks";
import { Card } from "../ui";
import { RatingsSkeleton } from "./ratings-skeleton";
import styles from "./ratings.module.css";

const formatLabel = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const RatingsSummaryCard = () => {
  const { data, isLoading } = useRatingsSummary();

  if (isLoading)
    return (
      <Card cardTitle="Ratings Summary">
        <RatingsSkeleton />
      </Card>
    );

  return (
    <Card cardTitle="Ratings Summary">
      <div className={styles.ratings}>
        {data &&
          Object.entries(data).map(([key, { rating, score }]) => (
            <dl key={key} className={styles["ratings-item"]}>
              <dt className={styles["ratings-item__label"]}>
                {formatLabel(key)}
              </dt>
              <dd>{rating}</dd>
              <dd>{Number(score).toFixed(2)}</dd>
            </dl>
          ))}
      </div>
    </Card>
  );
};
