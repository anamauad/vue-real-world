import EventService from '@/services/EventService.js'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsCount: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS_COUNT(state, count) {
      state.eventsCount = count
    }
  },
  actions: {
    createEvent({ commit, rootState }, event) {
      console.log(`user creating event is ${rootState.user.user.name}`)

      return EventService.postEvent(event).then(() =>
        commit('ADD_EVENT', event.data)
      )
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_COUNT', response.headers['x-total-count'])
        })
        .catch(error => console.log('Error', error.response))
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventyById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => commit('SET_EVENT', response.data))
          .catch(error => console.log('Error', error.response))
      }
    }
  },
  getters: {
    getEventyById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
