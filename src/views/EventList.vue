<template>
  <div>
    <h1>
      Event Listing <span class="count">({{ eventsCount }})</span>
    </h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />

    <router-link
      v-if="page != 1"
      rel="prev"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      >Prev Page</router-link
    >
    <template v-if="page != 1 && hasNextPage">
      |
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.eventsCount > this.page * 3
    },
    ...mapState(['events', 'eventsCount'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page
    })
  }
}
</script>

<style scoped>
.count {
  margin-left: 5px;
  font-size: 70%;
  color: darkgray;
}
</style>
