import { FC } from "react";
import Wrapper from "../assets/wrappers/StatItem";
import { StatsInterface } from "../utils/types";

export const StatItem: FC<StatsInterface> = ({
  count,
  title,
  icon,
  color,
  bcg,
}: StatsInterface) => {
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
