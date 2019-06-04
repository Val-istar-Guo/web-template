// path of template files
exports.path = './template'

// mili version >= 2.0.0
exports.engines = ">=2.0.0 <3.0.0"


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
    path: 'client/create-app.js',
    upgrade: 'cover',
  },
  {
    path: 'client/create-store.js',
    upgrade: 'cover',
  },
  {
    path: 'client/create-router.js',
    upgrade: 'cover',
  },
  {
    path: 'client/app-plugins.js',
    upgrade: 'exist',
  },
  {
    path: 'client/template.html.mustache',
    upgrade: 'cover',
    handlers: [
      core => core.extractArea('header', '<!-- header -->'),
      core => core.extractArea('body', '<!-- body -->'),
      'mustache',
    ],
  },
  {
    path: 'client/service-worker.js',
    upgrade: 'exist',
  },
  {
    path: 'client/manifest.json.mustache',
    upgrade: 'exist',
    handlers: ['mustache'],
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
    path: '.gitignore',
    upgrade: 'merge',
  },
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache']
  },
  {
    path: '.babelrc',
    upgrade: 'merge',
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('content', '<!-- custom -->'),
      core => core.extractArea('introduce', '<!-- introduce -->'),
      'mustache',
    ],
  },
  {
    path: 'tsconfig.json.mustache',
    handlers: ['mustache'],
  },

  {
    path: '.pm2rc.yml',
    upgrade: 'exist',
  },
]
