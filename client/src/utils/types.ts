import { ReactElement } from "react";

export interface Store {
  user: UserStore;
  allJobs: AllJobsStore;
  job: JobStore;
}

export interface UserStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: UserInterface | null;
}

export interface JobStore {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

export enum SearchFormQuery {
  search = "search",
  searchStatus = "searchStatus",
  searchType = "searchType",
  sort = "sort",
}

export interface AllJobsStore {
  isLoading: boolean;
  jobs: [];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {} | StatsInterface;
  monthlyApplications: [];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

export interface UserInterface {
  name: string;
  lastName: string;
  email: string;
  location: string;
  token?: string;
  password: string;
}

export interface DefaultStatsInterface {
  title: string;
  count: number;
  icon: ReactElement;
  color: string;
  bcg: string;
}

export interface StatsInterface {
  pending: number;
  interview: number;
  declined: number;
}

export interface LinkInterface {
  id: number;
  text: string;
  path: string;
  icon: ReactElement;
}

// Base job data that user provides
export interface CreateJobInterface {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
}

// Full job interface extends the base with server-provided fields
export interface JobInterface extends CreateJobInterface {
  _id: string;
  createdAt: string;
  jobTypeOptions?: string[];
}

export interface EditJobInterface {
  jobId: string;
  job: CreateJobInterface;
}

export interface MonthlyApplications {
  date: string;
  count: number;
}

export enum JobParams {
  status = "status",
  jobType = "jobType",
  jobLocation = "jobLocation",
  company = "company",
  position = "position",
}
