import { FC } from "react";
import { useSelector } from "react-redux";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { StatItem } from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatsInterface } from "../utils/types";
import { Store } from "../utils/types";

export const StatsContainer: FC = () => {
  const { stats } = useSelector((store: Store) => store.allJobs);

  const defaultStats: StatsInterface[] = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats?.map((item: StatsInterface, index: number) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
