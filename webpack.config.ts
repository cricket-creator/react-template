import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

import HTMLWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

import { EnvMode } from "./constants";

export default (
  _cfg: object,
  { mode }: { mode: EnvMode }
): webpack.Configuration => {
  return {
    entry: {
      main: path.join(__dirname, "src", "index.tsx"),
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    performance: {
      hints: false,
    },
    optimization: {
      ...(mode === EnvMode.PRODUCTION && {
        minimize: mode === EnvMode.PRODUCTION,
        minimizer: [
          new TerserWebpackPlugin({
            terserOptions: {
              compress: true,
            },
            extractComments: true,
          }),
        ],
      }),
      splitChunks: {
        chunks: "all",
      },
    },
    devtool: mode === EnvMode.PRODUCTION ? false : "inline-source-map",
    ...(mode === EnvMode.DEVELOPMENT && {
      devServer: {
        static: {
          directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true,
        hot: true,
        onListening: (devServer) => {
          if (!devServer) {
            throw new Error("webpack-dev-server is not defined");
          }

          const address = devServer.server?.address();
          if (address && typeof address !== "string") {
            // eslint-disable-next-line no-console
            console.log(`Listening on port: ${address.port}`);
          }
        },
        open: true,
      },
    }),
    module: {
      rules: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
          include: path.resolve(__dirname, "src"),
          test: /\.(js|ts)x?$/i,
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          loader: "html-loader",
          test: /\.html$/i,
          exclude: /node_modules/,
        },
        {
          use: ["style-loader", "css-loader"],
          test: /\.css$/i,
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        components: path.resolve(__dirname, "src", "components"),
        contexts: path.resolve(__dirname, "src", "contexts"),
        hooks: path.resolve(__dirname, "src", "hooks"),
        providers: path.resolve(__dirname, "src", "providers"),
        pages: path.resolve(__dirname, "src", "pages"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        APPLICATION: JSON.stringify("Application"),
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HTMLWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        minify: true,
      }),
    ],
  };
};
