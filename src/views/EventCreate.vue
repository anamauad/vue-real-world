<template>
  <div>
    <h1>Create Event, {{ user.user.name }}</h1>
    <form @submit.prevent="createEvent">
      <base-select
        v-model="event.category"
        id="category"
        label="Select a category"
        :options="categories"
      />
      <h3>Name & describe your event</h3>
      <base-input
        v-model="event.title"
        id="title"
        label="Title"
        type="text"
        placeholder="Add an event title"
        class="field"
      />
      <base-input
        v-model="event.description"
        id="description"
        label="Description"
        type="text"
        placeholder="Add a description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <base-input
        v-model="event.location"
        id="location"
        label="Location"
        type="text"
        placeholder="Add a location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <base-select
          v-model="event.time"
          id="time"
          label="Select a time"
          :options="times"
        />
      </div>
      <base-button type="submit" buttonClass="-fill-gradient"
        >Submit a new event</base-button
      >
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times
    }
  },
  computed: mapState(['categories', 'user']),
  methods: {
    createFreshEventObject() {
      const username = this.$store.state.user.user.name
      const id = Math.floor(Math.random() + 10000000)
      return {
        id,
        category: '',
        organizer: username,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    openMessage() {
      window.alert('oi')
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
