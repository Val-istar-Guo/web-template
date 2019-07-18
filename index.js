exports.path = './template'
exports.engines = ">=3.5.0 <4.0.0"


exports.rules = [
  {
    path: 'client',
    upgrade: 'keep',
  },
  {
    path: 'client/@(app.vue|entry-ssr.js|entry-client.js|create-app.js|create-store.js|create-router.js)',
    upgrade: 'cover'
  },
  {
    path: 'client/@(app-plugins.js|service-worker.js)',
    upgrade: 'exist',
  },
  {
    path: 'client/manifest.json.mustache',
    upgrade: 'exist',
    handlers: ['mustache'],
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
    path: 'server',
    upgrade: 'keep',
  },
  {
    path: 'server/index.ts',
    upgrade: 'cover',
  },
  {
    path: 'server/middleware',
    upgrade: 'cover',
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
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('introduce', '<!-- introduce -->'),
      core => core.extractArea('more', '<!-- more -->'),
      'mustache',
    ],
  },
  {
    path: 'tsconfig.json.mustache',
    handlers: ['mustache'],
  },
  {
    path: 'config.yml',
    upgrade: 'exist',
  },
]
