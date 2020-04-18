<template>
  <div>
    <h1>Create Event, {{ user.user.name }}</h1>
    <form @submit.prevent="submit">
      <base-select
        v-model="event.category"
        id="category"
        label="Select a category"
        :options="categories"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p></template
      >
      <h3>Name & describe your event</h3>
      <base-input
        v-model.trim="event.title"
        id="title"
        label="Title"
        type="text"
        placeholder="Add an event title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <base-input
        v-model.trim="event.description"
        id="description"
        label="Description"
        type="text"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>
      <base-input
        v-model.trim="event.location"
        id="location"
        label="Location"
        type="text"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p></template
      >

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p></template
      >

      <base-select
        v-model="event.time"
        id="time"
        label="Select a time"
        :options="times"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p></template
      >

      <base-button
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$invalid"
        >Submit a new event</base-button
      >
      <p v-if="$v.$invalid" class="errorMessage">
        Please fill out the required field(s)
      </p>
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
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  data() {
    const times = []
    for (let i = 0; i <= 23; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
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
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createEvent()
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
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.errorMessage {
  color: #c00;
  font-variant: small-caps;
  font-style: italic;
}
</style>
