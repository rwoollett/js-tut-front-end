const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// instead of style-loader used MiniCssExtractPlugin.loader

module.exports = {
  // mode: 'development',
  entry: {
    app: [path.resolve(__dirname, './src/index.tsx')]
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)/,
        type: 'asset/resource'

      },
      { test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader' ]
      },
      { 
        test: /\.s?css$/,
        include: path.join(__dirname, 'src/scss'),
        use: [
          MiniCssExtractPlugin.loader, 
          { 
            loader: '@teamsupercell/typings-for-css-modules-loader'
          },
          { 
            loader: 'css-loader',
            options: { modules: true }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      //publicPath: "/",
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: 'Labs Home',
      template: './public/index.html'
    }),
    new ESLintPlugin({
      extensions: ['ts','tsx']
    })
 ]
};