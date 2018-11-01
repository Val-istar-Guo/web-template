import fs from 'fs';
import env from 'detect-env';
import { createBundleRenderer } from 'vue-server-renderer';


function renderToString(renderer, url, title = 'Vue-Koa Boilerplate') {
  return new Promise((resolve, reject) => {
    renderer.renderToString({ url, title }, (err, html) => {
      if (err) {
        err.status = err.code;
        err.expose = !env.is.prod;
        reject(err);
        return;
      }

      resolve(html);
    });
  });
}

export default function ({ bundle, template, manifest: clientManifest, title }) {
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest,
  });

  return async (ctx, next) => {
    let html = false;

    try {
      html = await renderToString(renderer, ctx.url, title);
    } catch (err) {
      if (err.status !== 404) {
        console.log('[Vue Server Side Render] ', err.stack);
        throw err;
      }
    }

    if (html) ctx.body = html;
    else await next();
  };
}
