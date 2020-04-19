<template>
  <div>
    <h1>{{ event.eventsCount }} Events for {{ user.user.name }}</h1>
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
import store from '@/store'
import gsap from 'gsap'

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage
      next()
    })
}

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
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  },
  mounted() {
    gsap.from('.event-card', {
      duration: 0.5,
      opacity: 0,
      scale: 1,
      y: 20,
      ease: 'power1',
      // stagger: 0.1
      stagger: {
        each: 0.1,
        from: 'edges'
      }
    })
  }
}
</script>

<style scoped></style>
