import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { Configuration as DevConfiguration } from "webpack-dev-server";

const authzUrl = `http://localhost:4000/authz`;

const gateway = {
  authzSignIn: {
    google: `${authzUrl}/sign-in/_google`,
    github: `${authzUrl}/sign-in/_github`,
  },
  authzSignUp: {
    google: `${authzUrl}/sign-up/_google`,
    github: `${authzUrl}/sign-up/_github`,
  },
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __GATEWAY__: JSON.stringify(gateway),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "web", "entry", "index.html"),
    }),
  ],
};

// noinspection JSUnusedGlobalSymbols
export default config;
