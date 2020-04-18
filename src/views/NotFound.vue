<template>
  <div>
    <h1>Oops!</h1>
    <h3>
      The
      <template v-if="resource">{{ resource }}</template>
      you are looking for is not here.
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the event list</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
