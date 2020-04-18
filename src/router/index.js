import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../components/NetworkIssue.vue'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
    beforeEnter(to, from, next) {
      const currentPage = parseInt(to.query.page || 1)
      // pre-rout guard
      store
        .dispatch('event/fetchEvents', {
          page: currentPage
        })
        .then(() => next())
    }
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      // pre-route guard
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(() => next())
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'event page' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/event/new',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    // catch all route
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
