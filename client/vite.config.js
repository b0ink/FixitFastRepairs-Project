import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const apiEndpoints = [
    'submit-ticket-comment',
    'delete-ticket-note',
    'get-ticket',
    'get-tickets',
    'update-device',
    'logout',
    'getphones',
    'getphone',
    'submitticket',
    'createaccount',
    'loginuser',
    'verifyemail',
    'check-auth',
    'user-data'
]

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    esbuild: {
        drop: ['console', 'debugger']
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001', // Change this to match your Express.js API server
                changeOrigin: true,
                secure: false,
                ws: true,
                cors: false

                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        cors: false
    },
    preview: {
        cors: false
    }
})
