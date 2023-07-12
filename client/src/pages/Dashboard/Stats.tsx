import { useEffect } from "react";
import { useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { StatsContainer, ChartsContainer } from "../../components";
import { RootState, useAppThunkDispatch } from "../../store";

const Stats = () => {
  const dispatch = useAppThunkDispatch();
  const { monthlyApplications } = useSelector(
    (store: RootState) => store.allJobs
  );

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
