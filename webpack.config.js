import * as path from "path";
import { VueLoaderPlugin } from "vue-loader";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    publicPath: "/dist/",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "./public"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
};
