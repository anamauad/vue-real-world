export const formFieldMixin = {
  inheritAttrs: false, // props will not be applied to the main div container
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ''
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
