import { join, resolve } from 'path'
import fs from 'fs-extra'
import env from '@framework/env'
import { createBundleRenderer, BundleRenderer } from 'vue-server-renderer'
import { Middleware } from 'koa'
import hmr from './hmr'
import compose from 'koa-compose'


function renderToString(renderer, url, title = 'Web Template'): Promise<string> {
  return new Promise((resolve, reject) => {
    renderer.renderToString({ url, title }, (err, html) => {
      if (err) {
        err.status = err.code
        err.expose = env.is.not.prod
        reject(err)
        return
      }

      resolve(html)
    })
  })
}

const title = process.env.Title
const clientDir = resolve(__dirname, '../client')
const templatePath = join(clientDir, 'template.html')
const bundlePath = join(clientDir, 'vue-ssr-bundle.json')
const manifestPath = join(clientDir, 'vue-ssr-manifest.json')


async function createRenderer(bundle: string, template: string, clientManifest: object): Promise<BundleRenderer> {
  return createBundleRenderer(bundle, { runInNewContext: false, template, clientManifest })
}

async function ssr(): Promise<Middleware> {
  let renderer: BundleRenderer

  if (!env.is.dev) {
    const template = await fs.readFile(templatePath, 'utf8')
    const clientManifest = await fs.readJSON(manifestPath)
    renderer = await createRenderer(bundlePath, template, clientManifest)
  }

  const middleware: Middleware = async(ctx, next) => {
    if (env.is.dev) {
      const outputPath = ctx.state.webpackStats.toJson().outputPath
      const template = ctx.state.fs.readFileSync(join(outputPath, 'template.html'), 'utf8')
      const clientManifest = ctx.state.fs.readFileSync(join(outputPath, 'vue-ssr-manifest.json'), 'utf8')
      renderer = await createRenderer(bundlePath, template, JSON.parse(clientManifest))
    }

    let html

    try {
      html = await renderToString(renderer, ctx.url, title)
    } catch (err) {
      if (err.status !== 404) throw err
    }

    if (html) ctx.body = html
    else await next()
  }

  return middleware
}

async function envSSR(): Promise<Middleware> {
  return compose([await hmr(), await ssr()])
}

export default env.is.dev ? envSSR : ssr
