<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input @input="updateValue" :value="value" v-bind="$attrs" />
    <!-- v-bind=$attrs defines that this element will inherit the component attributes -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // props will not be applied to the main div container
  props: {
    value: [String, Number],
    label: String
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
