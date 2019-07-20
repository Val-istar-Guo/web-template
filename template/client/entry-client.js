// Client entry file
import Vue from 'vue'
import createApp from './create-app'


Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { initialData } = this.$options

    if (initialData) {
      initialData.call(this, {
        store: this.$store,
        route: to,
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  },
})

const { app, store, router } = createApp()

// eslint-disable-next-line no-undef
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)

router.onReady(() => {
  app.$mount('#app', true)

  Vue.mixin({
    beforeMount() {
      const { initialData } = this.$options
      if (initialData) {
        this.dataPromise = initialData.call(this, {
          store: this.$store,
          route: this.$route,
        })
      }
    },
  })
})

