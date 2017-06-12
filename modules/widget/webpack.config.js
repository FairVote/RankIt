const fs = require('fs');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {NoEmitOnErrorsPlugin, NamedModulesPlugin} = require('webpack');
const {GlobCopyWebpackPlugin, BaseHrefWebpackPlugin} = require('@angular/cli/plugins/webpack');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AotPlugin} = require('@ngtools/webpack');
const merge = require('webpack-merge');
const nodeModules = path.join('node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "vendor", "main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const helpers = require('../../tools/helpers');
const postcssPlugins = require('../../tools/postcss-plugins')(baseHref, deployUrl, minimizeCss);
const RenderWidgetPlugin = require('../../tools/render-plugin');

const commonConfig = {
  devtool: "source-map",
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ],
    modules: [
      "node_modules"
    ],
    symlinks: true
  },
  resolveLoader: {
    modules: [
      "node_modules"
    ]
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          /\/node_modules\//
        ]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(eot|svg)$/,
        loader: "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|cur|ani)$/,
        loader: "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        exclude: [],
        test: /\.css$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins
            }
          }
        ]
      },
      {
        exclude: [],
        test: /\.scss$|\.sass$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      patterns: [],
      globOptions: {
        cwd: "/home/drew/rankit-fin/modules/widget/src",
        dot: true,
        ignore: "**/.gitkeep"
      }
    }),
    new ProgressBarPlugin(),

    new BaseHrefWebpackPlugin({}),
    new NamedModulesPlugin({}),
  ]
};

const browserConfig = merge({}, commonConfig, {
  entry: {
    main: "./src/app/browser/main.ts",
    polyfills: "./src/app/browser/polyfills.ts"
  },

  output: {
    path: path.join(__dirname, "dist", "app", "browser"),
    filename: "browser-[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  target: 'web',

  plugins: [

    new AotPlugin({
      //NOTE: this has to be the absolute path
      entryModule: helpers.root('modules/widget/src/app/browser/browser-widget.module#BrowserWidgetModule'),
      tsConfigPath: "./src/app/browser/tsconfig.json"
    }),

    new CommonsChunkPlugin({
      name: [
        "inline"
      ],
      minChunks: null
    }),


    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: ["main", "polyfills", "inline"],
      excludeChunks: [],
      title: "Webpack App",
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        }
        else if (leftIndex < rightindex) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }),
  ],
  node: {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  devServer: {
    historyApiFallback: true
  }


});

const serverConfig = merge({}, commonConfig, {
  entry: {
    index: "./src/app/server/index.ts"
  },

  output: {
    path: path.join(__dirname, "dist", "app", "server"),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    libraryTarget: 'umd',
  },
  target: 'node',

  plugins: [

    new AotPlugin({
      //NOTE: this has to be the absolute path
      entryModule: helpers.root('modules/widget/src/app/server/server-widget.module#ServerWidgetModule'),
      tsConfigPath: "./src/app/server/tsconfig.json"
    }),

    new RenderWidgetPlugin()
  ],

});


module.exports = [browserConfig, serverConfig];
