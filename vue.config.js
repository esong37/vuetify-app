const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    historyApiFallback: true // 确保在使用 history 模式时，所有路由都指向 index.html
  }
})
