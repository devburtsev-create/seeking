import type { PropsWithChildren } from "react";
import { memo } from "react";
import styles from "./card.module.css";

interface Props extends PropsWithChildren {
  cardTitle: string;
}

const CardComponent = ({ cardTitle, children }: PropsWithChildren<Props>) => {
  return (
    <article className={styles.card}>
      <h2 className={styles["card-title"]}>{cardTitle}</h2>
      <div className={styles["card-content"]}>{children}</div>
    </article>
  );
};

export const Card = memo(CardComponent);
