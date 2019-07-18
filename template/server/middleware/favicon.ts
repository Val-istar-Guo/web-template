import fs from 'fs-extra'
import mount from 'koa-mount'
import compose from 'koa-compose'

const androidIconSizes = [36, 48, 72, 96, 144, 192]
const appleIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180, 'precomposed']
const faviconIconSizes = [16, 32, 96]

function genIconFilenames(prefix: string, sizes: (string | number)[]): string[] {
  return sizes.map(size => `${prefix}-${size}x${size}.png`)
}

const iconList: string[] = [
  'favicon.ico',
  ...genIconFilenames('android-icon', androidIconSizes),
  ...genIconFilenames('apple-icon', appleIconSizes),
  ...genIconFilenames('favicon', faviconIconSizes),
]

const respondFavicon = filename => async ctx => {
  const iconPath = `./client/favicon/${filename}`

  if (!await fs.pathExists(iconPath)) {
    throw new Error(`[routes favicon] can not find file ${iconPath}`)
  }

  try {
    const data = await fs.readFile(iconPath)
    ctx.body = data
    ctx.set('Content-Type', 'image/x-ico')
  } catch (e) {
    throw new Error(`[routes favicon] can not read file ${iconPath}`)
  }
}


export default () => {
  const middlewares = iconList.map(filename => mount(`/${filename}`, respondFavicon(filename)))

  return compose(middlewares)
}
