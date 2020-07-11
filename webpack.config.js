const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  console.log(`mode = ${env.NODE_ENV}`)
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundled.js',
      path: path.resolve(__dirname, 'src'),
    },
    devtool: 'sourcemap',
    devServer: {
      before: (app, server) => {
        server._watch('./src/**/*.html')
      },
      contentBase: path.join(__dirname, 'src'),
      hot: true,
      port: 3000,
      host: '0.0.0.0'
    },
    mode: env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {},
            },
          ]
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }

      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'templates/index.html'
    })]
  };


}