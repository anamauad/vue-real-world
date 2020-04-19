<template>
  <div>
    <base-button @click="menuOpened = !menuOpened">Menu</base-button>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <div v-if="menuOpened" class="drawer">
        Drawer animated with Velocity
        <div></div>
        <div></div>
      </div>
    </transition>
    <transition
      @before-enter="beforeEnter"
      @enter="enter2"
      @leave="leave"
      :css="false"
    >
      <div v-if="menuOpened" class="drawer">
        Drawer animated with Velocity
        <div></div>
        <div></div>
      </div>
    </transition>

    <base-button @click="infoOpened = !infoOpened">{{
      infoOpened ? 'Close' : 'About'
    }}</base-button>
    <transition name="fade">
      <div v-if="infoOpened" class="modal">
        <p>App constructed during the Vuemastery.com courses</p>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import Velocity from 'velocity-animate'

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      menuOpened: false,
      infoOpened: false
    }
  },
  methods: {
    beforeEnter(el) {
      // set the initial style of the drawer before it enters the interface
      el.style.opacity = 0
      el.style.width = '0em'
    },
    enter(el, done) {
      // set the styles we want the drawer to end up with when it enters
      Velocity(
        el,
        { opacity: 1, width: '20em' }, // new style rules
        { duration: 1000, easing: 'easeOutCubic', complete: done } // how transition happens and complete it
        // see this URL about transitions: https://easings.net/en
        // Back, Elastic and Bounce are not available using Velocity animation
      )
    },
    enter2(el, done) {
      // set the styles we want the drawer to end up with when it enters
      Velocity(
        el,
        { opacity: 1, width: '20em' }, // new style rules
        { duration: 1000, easing: [60, 10], complete: done } // how transition happens and complete it
        // see this URL about transitions: https://easings.net/en
        // Back, Elastic and Bounce are not available using Velocity animation
      )
    },
    leave(el, done) {
      // set the styles we want the drawer to transition to when it leaves our interface
      Velocity(
        el,
        { opacity: 0, width: '0em' },
        { duration: 500, easing: 'easeInCubic', complete: done }
      )
    }
  }
}
</script>

<style scoped>
.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20em;
  height: 12em;
  border-radius: 1%;
  background-color: #e0e0e0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
  padding-top: 0.7em;
}
.drawer div {
  height: 3.5em;
  width: 95%;
  margin-top: 0.6em;
  background-color: #f0f0f0;
  border: 0.02em solid #ababab;
  border-radius: 1%;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
