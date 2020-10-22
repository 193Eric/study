
const webpack = require( 'webpack' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin( {
        'process.env': {
            NODE_ENV: '"production"'
        }
    } ),
    new webpack.LoaderOptionsPlugin( {
        minimize: true
    } ),
    new CopyWebpackPlugin( [ {
        from: path.resolve(__dirname, './packages' ),
        to: path.resolve(__dirname, './lib/src' ),
        ignore: [ '.*' ]
    } ] ),
    ]
  }
}