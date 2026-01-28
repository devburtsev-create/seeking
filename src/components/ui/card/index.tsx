import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  cardTitle: string;
}

export const Card = ({ cardTitle, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <h2>{cardTitle}</h2>
      {children}
    </div>
  );
};
