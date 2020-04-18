import apiClient from '@/api.js'
import NProgress from 'nprogress'

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})
apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },

  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },

  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
