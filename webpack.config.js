const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: path.resolve('src/main.js')
  },
  output: {
    filename: 'dist/bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },


  devServer: {
    contentBase: './dist',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('src'),
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        },
        exclude: /node_modules/
      },
      {
        test: /\.pcss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
              ident: 'postcss'
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              modules: false
            },
          }
        ]
      }
    ],
  },

  performance: false,
};
