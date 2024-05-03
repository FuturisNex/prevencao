const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/App.js',
  output: {
    filename: '[name].[contenthash].js', // Nome do arquivo de saída com hash
    path: path.resolve(__dirname, 'dist'), // Pasta de saída para os arquivos gerados
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
