<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <select @change="updateValue" :value="value" :id="id" v-bind="$attrs">
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String,
    options: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
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
