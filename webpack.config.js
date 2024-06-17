const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "esbuild-loader",
          options: {
            loader: "jsx",
            target: "es2015",
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(sass|css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: false,
              },
            },
            "file-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: "auto",
      historyApiFallback: true,
    },
    mode: isProduction ? "production" : "development",
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
    ],
  };
};
