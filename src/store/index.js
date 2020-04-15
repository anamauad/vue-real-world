import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'myuserid', name: 'Ana' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
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
    createEvent({ commit }, event) {
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
    fetchEvent({ commit }, id) {
      var event = this.getters.getEventyById(id)

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
    catLength: state => state.categories.length,
    getEventyById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
