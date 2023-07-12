import { useEffect, FC } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector } from "react-redux";
import { RootState, useAppThunkDispatch } from "../store";
import { Job } from "./Job";
import { Loader } from "./Loader";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import { PageBtnContainer } from "./PageBtnContainer";
import { JobInterface } from "../utils/types";

export const JobsContainer: FC = () => {
  const dispatch = useAppThunkDispatch();
  const {
    isLoading,
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store: RootState) => store.allJobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs?.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job: JobInterface) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
