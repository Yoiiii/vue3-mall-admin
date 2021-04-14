import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginImport from 'vite-plugin-babel-import'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    vitePluginImport([
      {
        libraryName:'element-plus',
        libraryDirectory:'es',
        style(name){
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ])
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.vue', '.js', 'jsx', '.json']
  },
  // 静态资源路径配置
  base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx'),
  server:{
    proxy:{
      '/api':{
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
      }
    }
  }
})