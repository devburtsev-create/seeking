import styles from "./quant-ranking-card.module.css";

export const QuantRankingSkeleton = () => {
  return (
    <div className={styles.content}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={styles.skeletonRow} data-testid="skeleton">
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonValue} />
        </div>
      ))}
      <div className={styles.skeletonLink} data-testid="skeleton" />
    </div>
  );
};
