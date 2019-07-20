import 'normalize.css'
import Vue from 'vue'

import App from './app'
import createRouter from './create-router'
import createStore from './create-store'
import './app-plugins'


export default function() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app, store, router }
}
