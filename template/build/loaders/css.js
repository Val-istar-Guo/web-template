const postcssPresetEnv = require('postcss-preset-env');

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
    'vue-style-loader',
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
