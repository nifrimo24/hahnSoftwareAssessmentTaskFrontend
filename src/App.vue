<template>
  <v-app>
    <v-main>
      <JobVacancyTable />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobVacancyTable from "@/components/JobVacancyTable.vue";

export default defineComponent({
  name: "App",
  components: {
    JobVacancyTable,
  },
});
</script>

<style>
@import "~vuetify/styles";
</style>
