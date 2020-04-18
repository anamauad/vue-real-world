<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input :value="value" :id="id" v-bind="$attrs" v-on="listeners" />
    <!-- v-bind=$attrs defines that this element will inherit the component attributes -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // props will not be applied to the main div container
  props: {
    value: [String, Number],
    label: String,
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
