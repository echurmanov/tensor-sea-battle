const path = require('path');
const webpack = require('webpack');

module.exports = function(env){
  return [
    {
      entry: {
        "game": './src/index.js'
      },
      output: {
        path: path.resolve(__dirname, './public/assets'),
        filename: '[name]'+(env=='dev'?'-dev':'')+'.js',
        libraryTarget: "var",
        library: "Game"
      },
      target: 'web'
    }
    //,{
    //  entry: {
    //    "test": './src-test/test.js'
    //  },
    //  output: {
    //    path: path.resolve(__dirname, './public/test/'),
    //    filename: '[name]'+(env=='dev'?'-dev':'')+'.js'
    //  },
    //  target: 'web',
    //  externals: {
    //    'game': 'Game'
    //  }
    //}

  ]
};