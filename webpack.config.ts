import path from "path";
import webpack, { LoaderContext } from "webpack";
import "webpack-dev-server";

import HTMLWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

import {
  EnvMode,
  OUTPUT_PATH,
  PUBLIC_PATH,
  SHARED_STYLES,
  SRC_PATH,
} from "./constants";

export default (
  _cfg: object,
  { mode }: { mode: EnvMode }
): webpack.Configuration => {
  const isProduction = mode === EnvMode.PRODUCTION;
  const isDevelopment = mode === EnvMode.DEVELOPMENT;

  return {
    entry: {
      main: path.join(SRC_PATH, "index.tsx"),
    },
    output: {
      path: OUTPUT_PATH,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    performance: {
      hints: false,
    },
    optimization: {
      ...(isProduction && {
        minimize: isProduction,
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
    devtool: isProduction ? false : "inline-source-map",
    ...(isDevelopment && {
      devServer: {
        static: {
          directory: PUBLIC_PATH,
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
          include: SRC_PATH,
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
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: (
                  content: string,
                  context: LoaderContext<unknown>
                ) => {
                  const { resourcePath, rootContext } = context;
                  const relativePath = path.relative(rootContext, resourcePath);
                  if (!relativePath.startsWith("src/components")) {
                    return content;
                  }
                  const imports = SHARED_STYLES.reduce((acc: string, style) => {
                    const url = path.join(SRC_PATH, "styles", style);
                    return `${acc}\n@import "${url}";`;
                  }, "");
                  return `${imports}\n${content}`;
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".json",
        ".css",
        ".sass",
        ".scss",
      ],
      alias: {
        components: path.resolve(SRC_PATH, "components"),
        contexts: path.resolve(SRC_PATH, "contexts"),
        hooks: path.resolve(SRC_PATH, "hooks"),
        providers: path.resolve(SRC_PATH, "providers"),
        pages: path.resolve(SRC_PATH, "pages"),
        styles: path.resolve(SRC_PATH, "styles"),
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
        template: path.join(PUBLIC_PATH, "index.html"),
        minify: true,
      }),
    ],
  };
};
