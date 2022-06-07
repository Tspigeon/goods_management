const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //设置页面的标签名
  chainWebpack: config => {
    config.plugin('html').tap(args => {
        args[0].title = '商品管理系统'
        return args
    })},
}
)
