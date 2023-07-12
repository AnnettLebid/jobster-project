import { FC } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";
import { RootState, useAppThunkDispatch } from "../store";

export const SearchContainer: FC = () => {
  const dispatch = useAppThunkDispatch();
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store: RootState) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector(
    (store: RootState) => store.job
  );

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (isLoading) {
      return;
    }
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
