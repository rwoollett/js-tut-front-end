const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { allowedNodeEnvironmentFlags } = require('process');

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
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        components: path.resolve(__dirname, './src/components/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg)/,
          type: 'asset/resource'
  
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        { test: /\.tsx?$/, 
          exclude: /dist/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: true}}]
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
      new CleanWebpackPlugin({ dry: false }),
      new MiniCssExtractPlugin({
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


