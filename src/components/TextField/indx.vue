<template>
  <div class="form-group">
    <input
      class="form-control"
      :value="value"
      @input="updateValue($event)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(e) {
      const { value } = e.target;
      this.$emit("input", value);
    },
  },
};
</script>

<style></style>
