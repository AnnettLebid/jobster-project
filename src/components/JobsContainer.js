import { useEffect, useState } from "react";
import axios from "axios";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
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
  } = useSelector((store) => store.allJobs);

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
        {jobs?.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
