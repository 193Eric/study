
let path = require("path");
let Plugin = require("./src/plugins/Plugin");
// console.log(path.join(__dirname, "src/loaders"));
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: "babel-loader",
            loader: path.resolve(__dirname, "src", "loaders", "loaderText"),
          }
        ]
      },
    ]
  },
  plugins: [new Plugin()]
};