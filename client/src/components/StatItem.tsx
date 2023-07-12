import { FC } from "react";
import Wrapper from "../assets/wrappers/StatItem";
import { DefaultStatsInterface } from "../utils/types";

export const StatItem: FC<DefaultStatsInterface> = ({
  count,
  title,
  icon,
  color,
  bcg,
}: DefaultStatsInterface) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
