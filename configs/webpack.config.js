const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotEnv = require("dotenv");

const Paths = {
  dist: path.resolve(__dirname, "../dist"),
  public: path.resolve(__dirname, "../public"),
  root: path.resolve(__dirname, ".."),
  src: path.resolve(__dirname, "../src"),
};
const AliasPaths = {
  Features: path.resolve(__dirname, "../src/features"),
  Lang: path.resolve(__dirname, "../src/lang"),
  Layouts: path.resolve(__dirname, "../src/layouts"),
  Locales: path.resolve(__dirname, "../src/locales"),
  Routes: path.resolve(__dirname, "../src/routes"),
  Services: path.resolve(__dirname, "../src/services"),
  Store: path.resolve(__dirname, "../src/store"),
  Views: path.resolve(__dirname, "../src/views"),
  react: path.resolve(__dirname, "../node_modules/react"),
};
const isDev = process.env.NODE_ENV === "development";

const basePath = Paths.root + "/.env";
const envPath = basePath + "." + process.env.NODE_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;
const env = DotEnv.config({ path: finalPath }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
  mode: process.env.NODE_ENV,
  context: Paths.root,
  devServer: {
    contentBase: Paths.public,
    historyApiFallback: true,
    hot: true,
    overlay: true,
  },
  devtool: isDev ? "inline-source-map" : "source-map",
  entry: {
    app: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ["react-hot-loader/webpack", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: Paths.public,
              hmr: isDev,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.json$/,
        use: { loader: "json-loader" },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[hash].[ext]",
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash].[ext]",
          },
        },
      },
    ],
  },
  optimization: {},
  output: {
    filename: isDev ? "[name].js" : "[name].[hash].js",
    path: Paths.dist,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "..", "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  resolve: {
    alias: AliasPaths,
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  watch: isDev,
};

if (!isDev) {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: true,
    })
  );
  config.optimization.splitChunks = { chunks: "all" };
}

module.exports = config;
