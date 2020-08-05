const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const Paths = {
  dist: path.resolve(__dirname, "../public/assets"),
  public: path.resolve(__dirname, "../public"),
  root: path.resolve(__dirname, ".."),
  src: path.resolve(__dirname, "../src"),
  alias: {
    Features: path.resolve(__dirname, "../src/features"),
    Layouts: path.resolve(__dirname, "../src/layouts"),
    Routes: path.resolve(__dirname, "../src/routes"),
    Services: path.resolve(__dirname, "../src/services"),
    Store: path.resolve(__dirname, "../src/store"),
    Views: path.resolve(__dirname, "../src/views"),
  },
};

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  context: Paths.root,
  devServer: {
    contentBase: Paths.public,
    hot: true,
    overlay: true,
  },
  devtool: "inline-source-map",
  entry: {
    app: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
    filename: "[name].js",
    path: Paths.dist,
    publicPath: "/assets/",
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  resolve: {
    alias: {
      Features: Paths.alias.Features,
      Layouts: Paths.alias.Layouts,
      Routes: Paths.alias.Routes,
      Services: Paths.alias.Services,
      Store: Paths.alias.Store,
      Views: Paths.alias.Views,
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
