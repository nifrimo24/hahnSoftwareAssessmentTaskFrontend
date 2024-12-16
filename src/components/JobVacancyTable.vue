<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useJobStore } from "../stores/jobVacancyStore";
import { JobVacancy } from "../types";
import SearchField from "./SearchField.vue";
import JobVacancyDetailsDialog from "@/components/JobVacancyDetailsDialog.vue";
import JobVacancyFilter from "@/components/JobVacancyFilter.vue";

export default defineComponent({
  name: "JobVacancyTable",
  components: {
    JobVacancyDetailsDialog,
    SearchField,
    JobVacancyFilter,
  },
  setup() {
    const jobStore = useJobStore();
    const isLoading = ref(true);
    const search = ref("");
    const selectedCompany = ref("");
    const selectedGeoLocation = ref("");
    const selectedJobType = ref("");
    const selectedIndustry = ref("");
    const selectedLevel = ref("");

    const headers = ref([
      { title: "Title", key: "title" },
      { title: "Geolocation", key: "geoLocation" },
      { title: "Company Name", key: "companyName" },
      { title: "Job Type", key: "type" },
      { title: "Industry", key: "industry" },
      { title: "Level", key: "level" },
      { title: "Actions", key: "actions", sortable: false },
    ]);
    const selectedJob = ref<JobVacancy | null>(null);
    const isModalOpen = ref(false);

    onMounted(async () => {
      await jobStore.fetchJobs();
      isLoading.value = false;
    });

    const jobs = computed(() => {
      return jobStore.jobs.filter((job) => {
        return (
          (!selectedCompany.value ||
            job.companyName === selectedCompany.value) &&
          (!selectedGeoLocation.value ||
            job.geoLocation === selectedGeoLocation.value) &&
          (!selectedJobType.value || job.type === selectedJobType.value) &&
          (!selectedIndustry.value ||
            job.industry === selectedIndustry.value) &&
          (!selectedLevel.value || job.level === selectedLevel.value)
        );
      });
    });

    const companyNames = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.companyName))];
    });

    const geoLocations = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.geoLocation))];
    });

    const jobTypes = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.type))];
    });

    const industries = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.industry))];
    });

    const levels = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.level))];
    });

    const openModal = (job: JobVacancy) => {
      selectedJob.value = job;
      isModalOpen.value = true;
    };

    watch(selectedCompany, (newValue) => {
      console.log("Selected company:", newValue);
    });

    return {
      jobs,
      isLoading,
      search,
      headers,
      selectedJob,
      isModalOpen,
      openModal,
      companyNames,
      selectedCompany,
      geoLocations,
      selectedGeoLocation,
      jobTypes,
      selectedJobType,
      industries,
      selectedIndustry,
      levels,
      selectedLevel,
    };
  },
});
</script>

<template>
  <v-card flat>
    <v-card-title class="custom-title"> Job Vacancies </v-card-title>
    <div class="search-filters-container">
      <div class="search-container">
        <SearchField v-model:search="search" />
      </div>
      <div class="filters-container">
        <JobVacancyFilter
          label="Filter by Company"
          :items="companyNames"
          v-model="selectedCompany"
        />
        <JobVacancyFilter
          label="Filter by Geolocation"
          :items="geoLocations"
          v-model="selectedGeoLocation"
        />
        <JobVacancyFilter
          label="Filter by Job Type"
          :items="jobTypes"
          v-model="selectedJobType"
        />
        <JobVacancyFilter
          label="Filter by Industry"
          :items="industries"
          v-model="selectedIndustry"
        />
        <JobVacancyFilter
          label="Filter by Level"
          :items="levels"
          v-model="selectedLevel"
        />
      </div>
    </div>
    <div class="table-container">
      <v-data-table
        :headers="headers"
        :items="jobs"
        :search="search"
        class="elevation-1"
        :items-per-page="10"
        header-class="bold-header"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="openModal(item)" color="primary">View Details</v-btn>
        </template>
      </v-data-table>
    </div>
    <JobVacancyDetailsDialog
      :isModalOpen="isModalOpen"
      :selectedJob="selectedJob"
      @update:isModalOpen="isModalOpen = $event"
    />
  </v-card>
</template>

<style scoped>
.custom-title {
  font-size: 36px;
  font-weight: bold;
}

.search-filters-container {
  padding: 1rem; /* Adjust the padding as needed */
}

.search-container {
  width: 40%;
  margin-bottom: 1rem;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.table-container {
  padding: 1rem;
  overflow-x: auto;
}
</style>
