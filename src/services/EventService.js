import apiClient from '@/api.js'

export default {
  getEvents() {
    return apiClient.get('/events')
  },

  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },

  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
