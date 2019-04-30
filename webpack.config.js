const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "dist"),
  SRC: path.resolve(__dirname, "./src"),
  PUBLIC_PATH: path.resolve(__dirname, "./public"),
  ASSET_PATH: process.env.ASSET_PATH || "/"
};

module.exports = env => {
  return {
    mode: env.prod ? "production" : "development",
    bail: env.prod,
    devServer: {
      contentBase: paths.SRC,
      compress: true,
      port: 9000,
      watchContentBase: true,
      progress: true,
      publicPath: paths.ASSET_PATH,
      hot: true
    },
    devtool: env.prod ? "source-maps" : "eval",
    entry: path.join(paths.SRC, "index.js"),
    output: {
      path: paths.DIST,
      pathinfo: !env.prod,
      filename: env.prod
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
      chunkFilename: env.prod
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
      publicPath: paths.ASSET_PATH
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              {
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "react-css-modules"
                ]
              }
            ]
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]_[local]__[hash:base64:5]"
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(paths.PUBLIC_PATH, "index.html")
      }),
      new CopyWebpackPlugin([
        {
          from: paths.PUBLIC_PATH,
          to: paths.DIST
        }
      ])
    ],
    resolve: {
      extensions: [".js"]
    }
  };
};
