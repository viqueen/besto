import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { Configuration as DevConfiguration } from "webpack-dev-server";

const authzGithubUrl = () => {
  return "http://localhost:4000/authz/_github";
};

const authzGoogleUrl = () => {
  return "http://localhost:4000/authz/_google";
};

const config: Configuration & DevConfiguration = {
  mode: "development",
  devServer: {
    port: 10000,
    open: true,
  },
  entry: {
    app: "./web/entry/index.tsx",
  },
  target: "web",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".sass"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __GATEWAY__: JSON.stringify({
        authzGoogleUrl: authzGoogleUrl(),
        authzGithubUrl: authzGithubUrl(),
      }),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "web", "entry", "index.html"),
    }),
  ],
};

// noinspection JSUnusedGlobalSymbols
export default config;
