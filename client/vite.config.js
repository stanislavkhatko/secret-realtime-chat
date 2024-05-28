import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
    envDir: './../',
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': __dirname,
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
        },
    },
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: `http://127.0.0.1:${process.env.VITE_SOCKET_PORT}`,
    //             changeOrigin: true
    //         }
    //     }
    // },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "/assets/scss/abstract/variables.scss"; @import "/assets/scss/abstract/mixins.scss";`
            }
        }
    },
})
