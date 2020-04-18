<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It looks you are experiencing some network issues, please click the back
      button or try again.
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Or go back to the event list</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
