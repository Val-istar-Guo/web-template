import compose from '@client/utils/compose-plugins'


import createRouter from './router'
import createVuetify from './vuetify'
import createStore from './vuex'

export default compose(createRouter, createStore, createVuetify)
