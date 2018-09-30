/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cssFilename = 'static/css/[name].[hash:8].css';
const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') };

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve('src/main.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safeParser,
          discardComments: {
            removeAll: true
          }
        }
      }),
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin(getClientEnvironment()),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: cssFilename
    }),
    new CleanWebpackPlugin('./dist')
  ],

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('src'),
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.pcss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: extractTextPluginOptions
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss'
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: extractTextPluginOptions
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: false
            },
          }
        ]
      }
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
};

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => ['NODE_ENV', 'BASE_URL'].includes(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {}
    );
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}
