const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('inferno-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('inferno-dev-utils/WatchMissingNodeModulesPlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

const publicPath = '/'
const publicUrl = ''
const env = getClientEnvironment(publicUrl)

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('inferno-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath,
  },
  resolve: {
    modules: [ 'node_modules', ],
    extensions: [ '.js', '.json', '.jsx', ],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: paths.appSrc,
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              options: {

              },
              plugins: () => [
                require('postcss-import')({ addDependencyTo: webpack, }),
                require('postcss-url')(),
                require('postcss-cssnext')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                }),
                require('stylelint')(),
                require('postcss-browser-reporter')(),
                require('postcss-reporter')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
