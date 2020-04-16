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
    createEvent({ commit, dispatch, rootState }, event) {
      console.log(`user creating event is ${rootState.user.user.name}`)

      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your event has been created!'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'Error while creating your event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_COUNT', response.headers['x-total-count'])
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'Error while fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, dispatch, getters }, id) {
      var event = getters.getEventyById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => commit('SET_EVENT', response.data))
          .catch(error => {
            const notification = {
              type: 'error',
              message: `Error while fetching event ${id}:` + error.message
            }
            dispatch('notification/add', notification, { root: true })
          })
      }
    }
  },
  getters: {
    getEventyById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
