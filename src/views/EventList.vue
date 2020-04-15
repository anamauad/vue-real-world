<template>
  <div>
    <h1>{{ event.eventsCount }} Events for {{ user.name }}</h1>
    <event-card v-for="event in event.events" :key="event.id" :event="event" />

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
      return this.event.eventsCount > this.page * 3
    },
    ...mapState(['event', 'user'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page
    })
  }
}
</script>

<style scoped></style>
