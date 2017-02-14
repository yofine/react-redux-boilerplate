const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'eval-source-map',
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
    path: path.resolve(__dirname, './src', './assets'),
    filename: "[name].js",
    publicPath: '/assets/'
  },
  resolve:{
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({options: {context: path.resolve(__dirname, './src')}}),
    new BundleAnalyzerPlugin({analyzerPort: 8090}),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'app', async: true }),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}}),
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
  },
  devServer: {
    hot: false,
    compress: true,
    contentBase: path.resolve(__dirname, './src'),
    port: 8089
  }
}
