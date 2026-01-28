import type { PropsWithChildren } from "react";
import styles from "./card.module.css";

interface Props extends PropsWithChildren {
  cardTitle: string;
}

export const Card = ({ cardTitle, children }: PropsWithChildren<Props>) => {
  return (
    <div className={styles["card"]}>
      <h2 className={styles["card-title"]}>{cardTitle}</h2>
      {children}
    </div>
  );
};
