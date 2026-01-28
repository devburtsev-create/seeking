import styles from "./ratings.module.css";

export const RatingsSkeleton = () => {
  return (
    <div className={styles.ratings}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.skeletonRow} data-testid="skeleton">
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonRating} />
          <div className={styles.skeletonScore} />
        </div>
      ))}
    </div>
  );
};
