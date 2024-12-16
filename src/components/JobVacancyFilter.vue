<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "JobVacancyFilter",
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array as () => string[],
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props, { emit }) {
    const selected = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        selected.value = newVal;
      }
    );

    watch(selected, (newVal) => {
      console.log("Selected value:", newVal);
      emit("update:modelValue", newVal);
    });

    return {
      selected,
    };
  },
});
</script>

<template>
  <v-select
    clearable
    chips
    :label="label"
    :items="items"
    v-model="selected"
    variant="outlined"
  ></v-select>
</template>
