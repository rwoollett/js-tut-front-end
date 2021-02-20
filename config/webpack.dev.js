const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
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
  module: {
    rules: [
      { test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: false}}]
      }
    ]
  },
  plugins: [
  ]
};

module.exports = merge(commonConfig, devConfig);

