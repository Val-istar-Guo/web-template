// path of template files
exports.path = './template'

// mili version >= 1.0.0
exports.engines = ">=1.0.0<2.0.0"


exports.rules = [
  {
    path: 'client',
    upgrade: 'keep',
  },
  {
    path: 'client/app.vue',
    upgrade: 'cover'
  },
  {
    path: 'client/entry-ssr.js',
    upgrade: 'cover',
  },
  {
    path: 'client/entry-client.js',
    upgrade: 'cover',
  },
  {
    path: 'client/createApp.js',
    upgrade: 'cover',
  },
  {
    path: 'client/createStore.js',
    upgrade: 'cover',
  },
  {
    path: 'client/createRouter.js',
    upgrade: 'cover',
  },
  {
    path: 'client/template.html',
    upgrade: 'cover',
  },


  {
    path: 'server',
    upgrade: 'keep',
  },
  {
    path: 'server/middleware/vue-server-render.js',
    upgrade: 'cover',
  },
  {
    path: 'server/routes/favicon.js',
    upgrade: 'cover',
  },

  {
    path: 'build.config.js',
    upgrade: 'keep',
  },

  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache']
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('content', '<!-- custom -->'),
      'mustache',
    ],
  },
]
