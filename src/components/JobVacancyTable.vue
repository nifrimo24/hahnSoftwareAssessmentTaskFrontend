<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useJobStore } from "../stores/jobVacancyStore";

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

export default defineComponent({
  name: "JobVacancyTable",
  setup() {
    const jobStore = useJobStore();
    const isLoading = ref(true);
    const search = ref("");
    const headers = ref([
      { title: "Title", key: "title" },
      { title: "Geolocation", key: "geoLocation" },
      { title: "Company Name", key: "companyName" },
      { title: "Job Type", key: "type" },
      { title: "Industry", key: "industry" },
      { title: "Level", key: "level" },
      { title: "Actions", key: "actions", sortable: false },
    ]);
    const selectedJob = ref<Job | null>(null);
    const isModalOpen = ref(false);
    const show = ref(false);

    onMounted(async () => {
      await jobStore.fetchJobs();
      isLoading.value = false;
    });

    const jobs = computed(() => jobStore.jobs);

    const openModal = (job: Job) => {
      selectedJob.value = job;
      isModalOpen.value = true;
    };

    const navigateToJobUrl = () => {
      console.log("selectedJob.value?.url", selectedJob.value?.url);
      if (selectedJob.value?.url) {
        window.open(selectedJob.value.url, "_blank");
      }
    };

    return {
      jobs,
      isLoading,
      search,
      headers,
      selectedJob,
      isModalOpen,
      openModal,
      navigateToJobUrl,
      show,
    };
  },
});
</script>

<template>
  <v-card title="Job Vacancies" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
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

    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          {{ selectedJob?.title }}
        </v-card-title>
        <v-card-subtitle>
          <strong>Company Name:</strong>
          {{ selectedJob?.companyName }}
        </v-card-subtitle>
        <v-card-subtitle>
          <strong>Location:</strong>
          {{ selectedJob?.geoLocation }}
        </v-card-subtitle>
        <v-card-subtitle>
          <strong>Industry:</strong>
          {{ selectedJob?.industry }}
        </v-card-subtitle>
        <v-card-subtitle>
          <strong>Job Type:</strong> {{ selectedJob?.type }}
        </v-card-subtitle>
        <v-card-subtitle>
          <strong>Salary Range:</strong> {{ selectedJob?.annualSalaryMin }} -
          {{ selectedJob?.annualSalaryMax }} {{ selectedJob?.currency }}
        </v-card-subtitle>
        <v-card-text>
          <p><strong>Introduction:</strong> {{ selectedJob?.excerpt }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Description"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <p v-html="selectedJob?.description"></p>
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="isModalOpen = false">Close</v-btn>
          <v-btn @click="navigateToJobUrl" class="apply-button">
            <v-icon left>mdi-check</v-icon>
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.apply-button {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.apply-button:hover {
  background-color: #1565c0; /* Background color on hover */
}

.company-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
