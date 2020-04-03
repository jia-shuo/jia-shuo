const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
    lintOnSave:false,
    // ngix 在开发环境中的替身
    devServer:{
        port:3001,
        open:true,
        proxy:{
            //请求是可以找到4000服务器 可是4000服务没有对应的接口  devserve会主动返回index.html
            '/4000': {
                target: 'http://localhost:4000',
                changeOrigin: true, //允许跨域
                pathRewrite:{
                    "^/4000":""
                }
            },
            '/5000': {
                target: 'http://localhost:5000',
                changeOrigin: true, //允许跨域
                pathRewrite:{
                    "^/5000":""
                }
            },
        }
    },
    configureWebpack:{
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
                'store': resolve('src/store')
            }
        }
    }
}