<template>
  <div>
    <div class="clock">
      <div :style="{ width: tweenedHours / 0.24 + '%' }" class="bar">
        <span>{{ tweenedHours.toFixed(0) }}</span>
      </div>
      <div :style="{ width: tweenedMinutes / 0.6 + '%' }" class="bar">
        <span>{{ tweenedMinutes.toFixed(0) }}</span>
      </div>
      <div :style="{ width: tweenedSeconds / 0.6 + '%' }" class="bar">
        <span>{{ tweenedSeconds.toFixed(0) }}</span>
      </div>
    </div>
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
    <transition
      appear
      @before-enter="beforeEnterGsap"
      @enter="enterGsap"
      :css="false"
    >
      <div v-if="menuOpened" class="drawer">
        Drawer animated with GSAP3
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
import gsap from 'gsap'

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      menuOpened: false,
      infoOpened: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      tweenedHours: 0,
      tweenedMinutes: 0,
      tweenedSeconds: 0,
      interval: null
    }
  },
  watch: {
    seconds(newValue) {
      gsap.to(this.$data, {
        duration: 1,
        ease: 'circ.out',
        tweenedSeconds: newValue
      })
    },
    minutes(newValue) {
      gsap.to(this.$data, {
        duration: 1,
        ease: 'circ.out',
        tweenedMinutes: newValue
      })
    },
    hours(newValue) {
      gsap.to(this.$data, {
        duration: 1,
        ease: 'circ.out',
        tweenedHours: newValue
      })
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
    },
    beforeEnterGsap(el) {
      el.style.opacity = 0
      el.style.transform = 'scale(0,0)'
    },
    enterGsap(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: 'bounce.out',
        onComplete: done
      })
    },
    updateSeconds() {
      if (this.seconds < 59) {
        this.seconds++
      } else {
        this.updateTime()
      }
    },
    updateTime() {
      const now = new Date()
      this.hours = now.getHours()
      this.minutes = now.getMinutes()
      this.seconds = now.getSeconds()
    }
  },
  created() {
    this.updateTime()
    this.interval = setInterval(this.updateSeconds, 1000)
  },
  destroyed() {
    clearInterval(this.interval)
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

.clock {
  padding: 20px 0;
}
.clock .bar {
  padding: 5px;
  background-color: #2c3e50;
  border: 1px #16c0b0 solid;
  min-width: 20px;
}
.clock .bar span {
  color: white;
}
</style>
