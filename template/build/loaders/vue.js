const vueLoader = {
  loader: 'vue-loader',
  options: {
    transformAssetUrls: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: ['xlink:href', 'href'],
      use: ['xlink:href', 'href'],
      'v-img': ['src'],
    }
  }
};

export default { test: /\.vue/, exclude: /node_modules/, use: [vueLoader] };
