import { FC } from "react";
import { useSelector } from "react-redux";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { StatItem } from "./StatItem";
import { RootState } from "../store";
import Wrapper from "../assets/wrappers/StatsContainer";
import { DefaultStatsInterface, StatsInterface } from "../utils/types";

export const StatsContainer: FC = () => {
  const { stats } = useSelector((store: RootState) => store.allJobs);
  const { pending, interview, declined } = stats as StatsInterface;

  const defaultStats = [
    {
      title: "pending applications",
      count: pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats?.map((item: DefaultStatsInterface, index: number) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
