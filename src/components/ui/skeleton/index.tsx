import clsx from "clsx";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 4,
}: SkeletonProps) {
  return (
    <div className={styles.skeleton} style={{ width, height, borderRadius }} />
  );
}
