<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input :value="value" :id="id" v-bind="$attrs" v-on="listeners" />
    <!-- v-bind=$attrs defines that this element will inherit the component attributes -->
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: this.updateValue
      }
    }
  }
}
</script>

<style scoped></style>
