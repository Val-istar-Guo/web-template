import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@client/routes'


Vue.use(VueRouter)

export default function() {
  return {
    router: new VueRouter({
      mode: 'history',
      linkActiveClass: 'active',
      routes,
    }),
  }
}
