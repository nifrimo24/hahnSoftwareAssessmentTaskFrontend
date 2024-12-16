<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { JobVacancy } from "@/types";

export default defineComponent({
  name: "JobVacancyDetailsDialog",
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    selectedJob: {
      type: Object as () => JobVacancy | null,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = ref(false);
    const localIsModalOpen = ref(props.isModalOpen);

    watch(
      () => props.isModalOpen,
      (newVal) => {
        localIsModalOpen.value = newVal;
      }
    );

    const closeModal = () => {
      emit("update:isModalOpen", false);
    };

    const navigateToJobUrl = () => {
      if (props.selectedJob?.url) {
        window.open(props.selectedJob.url, "_blank");
      }
    };

    return {
      show,
      localIsModalOpen,
      closeModal,
      navigateToJobUrl,
    };
  },
});
</script>

<template>
  <v-dialog v-model="localIsModalOpen" max-width="600px">
    <v-card class="modal-content">
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
        <v-btn
          color="secondary"
          @click="
            closeModal();
            show = false;
          "
          >Close</v-btn
        >
        <v-btn @click="navigateToJobUrl" class="apply-button">
          <v-icon left>mdi-check</v-icon>
          Apply
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  background-color: #1565c0;
}

.modal-content {
  font-family: Arial, sans-serif; /* Cambia esto al tipo de letra que prefieras */
  padding: 20px; /* Ajusta el valor del padding según tus necesidades */
}

.modal-content .v-card-title,
.modal-content .v-card-subtitle,
.modal-content .v-card-text {
  padding-bottom: 10px; /* Ajusta el valor del padding según tus necesidades */
}
</style>
