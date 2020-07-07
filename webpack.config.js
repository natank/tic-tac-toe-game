const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postCSSPlugins = [
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]
module.exports = env => {
  console.log(`mode = ${env.NODE_ENV}`)
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundled.js',
      path: path.resolve(__dirname, 'src'),
    },
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
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }]
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'src/index.html'
    })]
  };


}