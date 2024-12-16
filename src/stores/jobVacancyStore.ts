import { defineStore } from "pinia";
import api from "../services/jobVacancyService";

interface Job {
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

interface JobStoreState {
  jobs: Job[];
}

export const useJobStore = defineStore("jobStore", {
  state: (): JobStoreState => ({
    jobs: [],
  }),
  actions: {
    async fetchJobs() {
      try {
        const response = await api.getJobs();
        this.jobs = response.data;
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    },
  },
});
