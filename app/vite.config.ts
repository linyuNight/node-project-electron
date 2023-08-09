import { fileURLToPath, URL } from 'node:url'
// import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite';
import AutoImportComponents from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteMockServe({
    //   mockPath: 'mock',
    //   enable: true,
    // }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      dts: "./build/autoImports/api.d.ts",
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // 按需自动引入组件，参考https://github.com/antfu/unplugin-vue-components
    AutoImportComponents({
      // resolvers: [VantResolver()],
      resolvers: [ElementPlusResolver()],
      dts: "./build/autoImports/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3030,
    open: true
  },
  preview: {
    port: 8080,
    open: true
  },
})
