export interface JobVacancy {
  id: number;
  apiId: number;
  annualSalaryMax: number;
  annualSalaryMin: number;
  companyId: number;
  companyLogo: string;
  companyName: string;
  createdAt: string;
  currency: string;
  description: string;
  excerpt: string;
  geoLocation: string;
  industry: string;
  level: string;
  postedDate: string;
  title: string;
  type: string;
  url: string;
}

export interface JobStoreState {
  jobs: JobVacancy[];
}
