//import
const webpack = require("webpack");
//let us work with paths
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//babel lug in know were in dev mode
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  //let us see our code in debugger
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  //where webpack to output
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    //erduces info in command line
    stats: "minimal",
    //overrlay any error in brrowset
    overlay: true,
    //all erquest wil lbe sent to html
    historyApiFallback: true,
    //
    disableHostCheck: true,
    //
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
