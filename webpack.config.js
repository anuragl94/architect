const path = require('path')

/*
  TODO: Fix babel transform step
  babel-transpiled code has issues with extending builtin ES6 classes
  like Array, HTMLElement, etc. For this reason, the build process ignores
  babel until a solution is found
*/

module.exports = {
  mode: 'development',
  entry: require.resolve('./index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  resolveLoader: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env']
    //       }
    //     }
    //   }
    // ]
  }
}
