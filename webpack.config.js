const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [path.resolve(__dirname, './src/index.tsx')]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.png/,
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
          'style-loader', 
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
    new ESLintPlugin({
      extensions: ['ts','tsx']
    })
    
  ]
};