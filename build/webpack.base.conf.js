const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/main.ts")
  },
  output: {
    path: path.resolve(__dirname, "../dist"), //打包后存放路径
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash:8].js" //公用部分资源分离
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // 处理图片
      // 需要安装（-D）file-loader，url-loader依赖file-loader
      {
        test: /\.(png|jpg|jfif|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
              // 这里的单位时bit
              limit: 20,
              name: "images/[name].[ext]",
              outputPath: "/"
            }
          }
        ]
      },
      // 字体图标啥的，跟图片分处理方式一样
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      minSize: 3000,
      minChunks: 2,
      name: true,
      cacheGroups: {
        vueBase: {
          name: "vue-base",
          test: /vue/,
          chunks: "all",
          priority: 9,
          minChunks: 1
        },
        elementUI: {
          name(module) {
            let packageName = module.context.match(
              /[\\/]node_modules[\\/]element-ui[\\/](.*?)([\\/]|$)(.*?)([\\/]|$)/
            );
            if (packageName && packageName[3]) {
              packageName = "main";
            } else {
              packageName = packageName[1];
            }
            return `element-ui.${packageName}`;
          },
          test: /element-ui/,
          chunks: "all",
          priority: 8,
          enforce: true
        }
      }
    }
  },

  plugins: [
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    // 生成一个新的index.html,将打包生成的js,css自动引入
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    //单独打包css文件
    new ExtractTextPlugin("styles/[name].[hash:8].css")
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      // 这个为src配置别名，非必需，为方便而已
      "@": path.resolve(__dirname, "../src")
    },
    // 在import这些拓展名的文件时，可以省略拓展名
    extensions: ["*", ".js", ".json", ".vue", ".ts", "scss"]
  },
  performance: {
    hints: false
  }
};
