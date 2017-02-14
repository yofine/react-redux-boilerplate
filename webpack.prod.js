const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    app: [
      './index.js',
      './styles/index.css',
      'antd/dist/antd.min.css'
    ],
    vendor: [
      'react', 'redux', 'react-redux', 'react-router-redux', 'react-router', 'react-dom', 'antd'
    ]
  },
  output: {
    path: path.resolve(__dirname, './build', './assets'),
    filename: "[name].[hash].js",
    publicPath: '/assets/'
  },
  resolve:{
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.template.html'),
      filename: path.resolve(__dirname, './build', './index.html'),
    }),
    new webpack.LoaderOptionsPlugin({options: { context: path.resolve(__dirname, './src')}}),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'app', async: true }),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production')} }),
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules|build/,
      loader: 'babel-loader?cacheDirectory=true'
    }, {
      test: /\.(ttf|eot|svg|woff)$/,
      loader: 'url-loader?limit=1000000'
    }, {
      test: /\.sass$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
}
