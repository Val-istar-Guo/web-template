import postcssPresetEnv from 'postcss-preset-env'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import env from 'detect-env'


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [ postcssPresetEnv({ stage: 0 }) ],
  },
}

const cssModuleLoader = {
  resourceQuery: /module/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[local]_[hash:base64:5]'
      }
    },
    postcssLoader,
  ],
}

// this matches plain `<style>` or `<style scoped>`
const cssLoader = {
  use: [
    !env.is.prod ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    postcssLoader,
  ]
}

export default {
  test: /\.(css|postcss)$/,
  oneOf: [cssModuleLoader, cssLoader],
}
