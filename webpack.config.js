/**
 * Created by ash on 11/05/2017.
 */
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exec = require('child_process').exec;

const config = {
  context: path.join(__dirname, '/example'),
  entry: './index.jsx',
  devtool: 'source-map',
  watchOptions: { poll: true },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: __dirname + '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(['css', 'sass']),
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?\S*)?$/,
        loader: 'url?limit=100000&font/name=[name].[ext]',
      },
      {
        test: /\.ico$/,
        loader:'file-loader?name=[name].ico',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loaders: ['jsx?harmony', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      }]
  },
  resolve: {
    root: [path.resolve(__dirname, ''), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx', '.png']
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {allChunks: true}),
    new webpack.NoErrorsPlugin(),
  ]
};


let compiler = webpack(config);
exec('gulp');
let server = new WebpackDevServer(compiler, {
  contentBase: './public',
  quiet: false,
  lazy: false,
  stats: {
    colors: true,
  },
  proxy: {
    '**': {
      secure: false,
      bypass(req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      },
    },
  },
});

server.listen(8033);