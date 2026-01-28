import { memo } from "react";
import {
  useFactorGrades3m,
  useFactorGrades6m,
  useFactorGradesNow,
} from "../../hooks";
import { Card } from "../ui";
import styles from "./factor-grades-card.module.css";
import { FactorGradesSkeleton } from "./factor-grades-skeleton";

const FACTOR_ORDER = [
  "Valuation",
  "Growth",
  "Profitability",
  "Momentum",
  "Revisions",
] as const;

const get6mValue = (data: [string, string][] | undefined, key: string) => {
  if (!data) return "-";
  return data.find(([k]) => k === key)?.[1] ?? "-";
};

const FactorGradesHeader = () => (
  <div className={styles.header}>
    <span className={styles.headerLabel}>Factor</span>
    <span>Now</span>
    <span>3M ago</span>
    <span>6M ago</span>
  </div>
);

const FactorGradesCardComponent = () => {
  const {
    data: now,
    isLoading: isNowLoading,
    error: nowError,
  } = useFactorGradesNow();
  const {
    data: m3,
    isLoading: is3mLoading,
    error: m3Error,
  } = useFactorGrades3m();
  const {
    data: m6,
    isLoading: is6mLoading,
    error: m6Error,
  } = useFactorGrades6m();

  const isLoading = isNowLoading || is3mLoading || is6mLoading;
  const hasError = nowError || m3Error || m6Error;

  if (isLoading) {
    return (
      <Card cardTitle="Factor Grades">
        <FactorGradesSkeleton />
      </Card>
    );
  }

  if (hasError || !now) {
    return (
      <Card cardTitle="Factor Grades">
        <div className={styles.error}>Unable to load factor grades data</div>
      </Card>
    );
  }

  const rows = FACTOR_ORDER.map((key) => ({
    label: key,
    now: now[key]?.current ?? "-",
    m3: m3?.[key] ?? "-",
    m6: get6mValue(m6, key),
  }));

  return (
    <Card cardTitle="Factor Grades">
      <div className={styles.table}>
        <FactorGradesHeader />

        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{row.now}</span>
            <span className={styles.value}>{row.m3}</span>
            <span className={styles.value}>{row.m6}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const FactorGradesCard = memo(FactorGradesCardComponent);
