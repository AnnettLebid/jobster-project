import { FC, ReactElement } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface JobInfoInterface {
  icon: ReactElement;
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
