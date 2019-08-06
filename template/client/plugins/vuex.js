import Vue from 'vue'
import Vuex from 'vuex'

import store from '@client/store'


Vue.use(Vuex)

export default function() {
  return { store: new Vuex.Store(store) }
}
