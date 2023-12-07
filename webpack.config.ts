import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

import HTMLWebpackPlugin from "html-webpack-plugin";

export default (...args: unknown[]): webpack.Configuration => {
  console.log("args", args);
  return {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },
    devtool: "inline-source-map",
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
          console.log(`Listening on port: ${address.port}`);
        }
      },
      open: true,
    },
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
