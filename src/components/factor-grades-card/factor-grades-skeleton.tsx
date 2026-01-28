import styles from "./factor-grades-card.module.css";

export const FactorGradesSkeleton = () => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>Factor</span>
        <span>Now</span>
        <span>3M ago</span>
        <span>6M ago</span>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={styles.skeletonRow} data-testid="skeleton">
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonCell} />
          <div className={styles.skeletonCell} />
          <div className={styles.skeletonCell} />
        </div>
      ))}
    </div>
  );
};
