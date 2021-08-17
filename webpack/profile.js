/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const prodConfig = require('./prod');

module.exports = (env) => {
  return merge(prodConfig(env), {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // generated as an HTML file
        generateStatsFile: true,
        openAnalyzer: true,
      }),
    ],
  });
};
