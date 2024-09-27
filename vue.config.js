/*
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2023-12-05 16:01:22
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2023-12-07 09:12:15
 * @FilePath: \market\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const { defineConfig } = require("@vue/cli-service");
// const base = require('./src/network/config');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/shichang/",
  outputDir: "shichang", //输出文件目录
  transpileDependencies: true,
  // element-plus在vue3.0中按需自动导入
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        utils: "@/utils",
      },
    },
  },
  //解决跨域问题
  // devServer: {
  //   proxy: {
  //     //配置跨域
  //     "/api": {
  //       target: base, //填写请求的目标地址
  //       pathRewrite: {
  //         "^/api": "", //请求的时候使用这个api就可以
  //       }
  //     }
  //   },
  // }
});
