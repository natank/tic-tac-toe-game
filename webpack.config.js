const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
  let cssConfig = {
    test: /\.scss$/i,
    use: ['css-loader', 'sass-loader']
  }

  let config = {
    entry: './src/index.js',
    module: {
      rules: [
        cssConfig,
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {},
            },
          ]
        },
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'templates/index.html'
    })],


  }

  if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader')
    console.log(`currentTask = ${currentTask}`)

    config.output = {
      filename: 'bundled.js',
      path: path.resolve(__dirname, 'src'),
    }
    config.devServer = {
      before: (app, server) => {
        server._watch('./src/**/*.html')
      },
      contentBase: path.join(__dirname, 'src'),
      hot: true,
      port: 3000,
      host: '0.0.0.0'
    }
    config.mode = 'development'
  }



  if (currentTask == 'build') {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    config.output = {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
    }
    config.mode = 'production'
    config.optimization = {
      splitChunks: {
        chunks: 'all'
      }
    }
    config.plugins.push(...[
      new MiniCssExtractPlugin({
        filename: 'styles.[chunkhash].css'
      }),

      new CleanWebpackPlugin()
    ])
  }

  console.log(`config= ${JSON.stringify(config.devServer)}`)

  return config;

}