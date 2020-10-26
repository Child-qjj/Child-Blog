const debug = process.env.NODE_ENV !== 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    // baseUrl: '/', // 根域上下文目录
    // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    publicPath:'./', 
    configureWebpack:{ resolve: { alias: { 'assets': '@/assets', 'common': '@/common', 'components': '@/components', 'network': '@/network', 'views': '@/views', 'plugins': '@/plugins', } } },
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
                  return {
                    plugins: [
                      new CompressionWebpackPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                        deleteOriginalAssets: false, // 是否删除原文件
                        minRatio: 0.8
                      })
                    ]
                  }
        }
        // Object.assign(config, { // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
            config.plugins.delete('prefetch');
            config.plugin('webpack-bundle-analyzer')
                  .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                  .end();
        } else {
            // 生产开发配置

            config.plugin('webpack-bundle-analyzer')
                  .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                  .end();
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
        
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: process.env.PORT||8080,
        https: false,
        hotOnly: false,
    //     proxy: { // 配置跨域
    //         '/api': {
    //             target: 'http://39.108.125.224:3300/api',//默认端口80的话就不要写了,不然报错的会39.108.125.224:3300
    //             ws: true,
    //             changOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //    },
        before: app => { }
    }
}
