const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      },
    },
  },
  module: {
    // rules: [
    //   { test: /\.tsx?$/, 
    //     exclude: /node_modules/,
    //     use: [{ loader: 'ts-loader', options: { transpileOnly: false}}]
    //   }
    // ]
  },
  plugins: [
   // new BundleAnalyzerPlugin()
  ]

}

module.exports = merge(commonConfig, prodConfig);


