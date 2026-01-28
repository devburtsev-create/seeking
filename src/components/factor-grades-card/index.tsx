import {
  useFactorGrades3m,
  useFactorGrades6m,
  useFactorGradesNow,
} from "../../hooks";
import { Card } from "../ui";

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

const Header = () => (
  <div className={"styles.header"}>
    <span />
    <span>Now</span>
    <span>3M ago</span>
    <span>6M ago</span>
  </div>
);

export const FactorGradesSkeleton = () => {
  return (
    <div className={"styles.table"}>
      <Header />

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={"styles.skeletonRow"}>
          <div className={"styles.skeletonLabel"} />
          <div className={"styles.skeletonCell"} />
          <div className={"styles.skeletonCell"} />
          <div className={"styles.skeletonCell"} />
        </div>
      ))}
    </div>
  );
};

export const FactorGradesCard = () => {
  const { data: now, isLoading: isNowLoading } = useFactorGradesNow();
  const { data: m3, isLoading: is3mLoading } = useFactorGrades3m();
  const { data: m6, isLoading: is6mLoading } = useFactorGrades6m();

  const isLoading = isNowLoading || is3mLoading || is6mLoading;

  if (isLoading) {
    return (
      <Card cardTitle="Factor Grades">
        <FactorGradesSkeleton />
      </Card>
    );
  }

  console.log();

  const rows = FACTOR_ORDER.map((key) => ({
    label: key,
    now: now?.[key]?.current ?? "-",
    m3: m3?.[key] ?? "-",
    m6: get6mValue(m6, key),
  }));

  return (
    <Card cardTitle="Factor Grades">
      <div className={"styles.table"}>
        <Header />

        {rows.map((row) => (
          <div key={row.label} className={"styles.row"}>
            <span className={"styles.label"}>{row.label}</span>
            <span className={"styles.value"}>{row.now}</span>
            <span className={"styles.value"}>{row.m3}</span>
            <span className={"styles.value"}>{row.m6}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
