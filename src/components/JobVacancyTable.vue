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
      if (selectedCompany.value) {
        return jobStore.jobs.filter(
          (job) => job.companyName === selectedCompany.value
        );
      }
      return jobStore.jobs;
    });

    const companyNames = computed(() => {
      return [...new Set(jobStore.jobs.map((job) => job.companyName))];
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
    };
  },
});
</script>

<template>
  <v-card title="Job Vacancies" flat>
    <template v-slot:text>
      <SearchField v-model:search="search" />
      <JobVacancyFilter
        label="Filter by Company"
        :items="companyNames"
        v-model="selectedCompany"
      />
    </template>

    <v-data-table
      :headers="headers"
      :items="jobs"
      :search="search"
      class="elevation-1"
      :items-per-page="10"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="openModal(item)" color="primary">View Details</v-btn>
      </template>
    </v-data-table>

    <JobVacancyDetailsDialog
      :isModalOpen="isModalOpen"
      :selectedJob="selectedJob"
      @update:isModalOpen="isModalOpen = $event"
    />
  </v-card>
</template>
