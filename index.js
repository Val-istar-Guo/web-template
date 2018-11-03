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
    path: 'client/template.html.mustache',
    upgrade: 'cover',
    handlers: [
      core => core.extractArea('header', '<!-- header -->'),
      core => core.extractArea('body', '<!-- body -->'),
      'mustach',
    ],
  },


  {
    path: 'server',
    upgrade: 'keep',
  },
  {
    path: 'server/index.js',
    upgrade: 'cover',
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
    path: '.buildrc.yml',
    upgrade: 'exist',
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

  {
    path: '.pm2rc.yml',
    upgrade: 'exist',
  },
]
