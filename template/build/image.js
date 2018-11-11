export default {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    'image-webpack-loader',
  ],
}
