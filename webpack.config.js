const path = require('path');
 
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader' ]
      },
      { 
        test: /\.css$/,
        include: path.join(__dirname, 'src/css'),
        use: [
          'style-loader', 
          { 
            loader: '@teamsupercell/typings-for-css-modules-loader'
          },
          { 
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};