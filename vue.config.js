module.exports = {
  devServer: {
    port: 8001,
    // 关闭主机检查，使微应用可以被fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      // 微应用的包名，与主应用中注册的微应用名称一致
      library: 'VueMicroAppOne',
      // 将library暴露为所有的模块定义下都可运行的方式，主应用就可获取到微应用的生命周期钩子函数了
      libraryTarget: 'umd',
      // 按需加载相关,设置为webpackJsonp_VueMicroAppOne
      jsonpFunction: `webpackJsonp_VueMicroAppOne`
    }
  }
}