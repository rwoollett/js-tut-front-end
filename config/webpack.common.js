const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
      app: [path.resolve(__dirname, '../src/index.tsx')]
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
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
          include: path.join(__dirname, '../src/scss'),
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


