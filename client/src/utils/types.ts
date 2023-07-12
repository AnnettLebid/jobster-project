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
  stats: {} | DefaultStatsInterface;
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
}

export interface StatsInterface {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

interface DefaultStatsInterface {
  pending: number;
  interview: number;
  declined: number;
}

export interface LinkInterface {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
}

export interface JobInterface {
  _id: string;
  company: string;
  position: string;
  status: string;
  createdAt: string;
  jobType: string;
  jobLocation: string;
}

export interface MonthlyApplications {
  date: string;
  count: number;
}
