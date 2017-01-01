import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import htmlPlugin from 'html-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public'),
}

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const htmlPluginConfig = new htmlPlugin({
  template: PATHS.build + '/index.html',
  filename: 'index.html',
  inject: 'body',
})

const base = {
  entry: {
    'bundle': ['bootstrap-loader', PATHS.app],
    'embedWidget': ['./app/containers/EmbedWidget/widgetLoader.js'],
    'iframeResizer': ['./app/iframeresizer.js'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/public',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
      {
        test: /\.(otf|png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    root: path.resolve('./app'),
  },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
  },
  plugins: [
    htmlPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(('app.css'), { allChunks: true }),
  ],
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    productionPlugin,
    new ExtractTextPlugin(('app.css'), { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)
