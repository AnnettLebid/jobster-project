import { FC } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface JobInfoInterface {
  icon: JSX.Element;
  text: string;
}

export const JobInfo: FC<JobInfoInterface> = ({
  icon,
  text,
}: JobInfoInterface) => {
  return (
    <Wrapper>
      <span className="icon">{icon} </span>
      <span className="text">{text} </span>
    </Wrapper>
  );
};
