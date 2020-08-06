const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode:"development",
  entry: "./src/app/vueNoCompiled.js",
  output: {
    path: `${__dirname}/public/js/webpack`,
    filename: "vueApp.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
