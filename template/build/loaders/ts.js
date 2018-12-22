const tsLoader = {
  loader: 'awesome-typescript-loader',
}

export default {
  test: /\.tsx?$/,
  exclude: file => ( /node_modules/.test(file) && !/\.vue\.js/.test(file)),
  use: [tsLoader],
}
