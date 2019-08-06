import 'normalize.css'
import Vue from 'vue'

import App from './app'
import createPlugins from './plugins'


export default function() {
  const plugins = createPlugins()

  const app = new Vue({
    ...plugins,
    render: h => h(App),
  })

  return { ...plugins, app }
}
