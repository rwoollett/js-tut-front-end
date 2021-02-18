const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    proxy: {
        '/api': {
        target: 'http://localhost:8081',
        secure: false
        }
    },
    publicPath: '/'
  },
  plugins: [
    //new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(commonConfig, devConfig);

