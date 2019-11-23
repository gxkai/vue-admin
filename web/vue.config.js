const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true, // 包含编译器
  publicPath: process.env.BASE_URL || '/',
  // lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: [
    'element-ui-verify/dist'
  ],
  configureWebpack: config => {
    // 配置代码压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        // 生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  },
  chainWebpack: config => {
    // 增加打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
        }])
    }
    // config.optimization.minimize(false)

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-spritse-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 设置一些别名
    // config.resolve.alias
    //   .set('@g', resolve('src/global'))
    //   .set('@bc', resolve('src/baseComponent'))
    //   .set('@common', resolve('src/modules/common/view'))
    //   .set('@utils', resolve('src/assets/utils'))
  },
  css: {
    loaderOptions: {
      sass: {
        data: `$aaa: #FF0000;`
      }
    }
  },
  devServer: {
    port: 9088,
    proxy: {
      '/v1/': {
        // target: 'https://demo.ccqiuqiu.win/iface-api',
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: false
      }
    }
  }
}
