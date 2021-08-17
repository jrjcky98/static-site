const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common');
const loaders = require('./loaders');

const webpackDev = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '..', 'public'),
    disableHostCheck: true,
    port: 3018,
    host: 'localhost',
    open: true,
  },
};

module.exports = (env) =>
  merge(
    webpackDev,
    webpackCommon(env),
    loaders.extractCSS(),
    loaders.loadFiles({
      options: {
        name: '[name].[ext]',
      },
    }),
    loaders.loadJavaScript(),
    loaders.loadPreESLint()
  );
