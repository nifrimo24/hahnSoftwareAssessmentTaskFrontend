import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5191",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getJobs() {
    return apiClient.get("/job-vacancies");
  },
};
