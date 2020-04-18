import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NotFound from '../views/NotFound.vue'
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
      store.dispatch('event/fetchEvent', to.params.id).then(() => next())
    }
  },
  {
    path: '/event/new',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    // catch all route
    path: '*',
    redirect: { name: '404' }
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
