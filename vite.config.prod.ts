import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function manualChunks(id: string): string | undefined {
    if (!id.includes('node_modules')) return undefined
    if (id.includes('/@supabase/')) return 'vendor-supabase'
    if (id.includes('/vue/') || id.includes('/vue-router/') || id.includes('/@vue/')) return 'vendor-vue'
    return 'vendor-misc'
}

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks
            }
        }
    }
})
