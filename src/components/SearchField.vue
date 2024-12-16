<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchField",
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localSearch = ref(props.search);

    watch(
      () => props.search,
      (newVal) => {
        localSearch.value = newVal;
      }
    );

    const updateSearch = (value: string) => {
      emit("update:search", value);
    };

    return {
      localSearch,
      updateSearch,
    };
  },
});
</script>

<template>
  <v-text-field
    v-model="localSearch"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    hide-details
    single-line
    @input="updateSearch"
  ></v-text-field>
</template>
