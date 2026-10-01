import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Demo build — backendsiz, bitta HTML fayl sifatida ulashish uchun.
 *
 * `scripts/build-demo.mjs` shu build natijasini bitta faylga yig'adi.
 * Asosiy `vite.config.ts` ga tegilmagan: demo ishlab chiqarish build'iga
 * hech qachon aralashmasligi kerak.
 */
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
        outDir: 'dist-demo',
        rollupOptions: {
            input: fileURLToPath(new URL('./demo.html', import.meta.url)),
            // Demo bitta faylga yig'ilgani uchun kod bo'linmasligi kerak
            output: { codeSplitting: false },
        },
        // Bitta faylga yig'ish uchun kod bo'linmasligi kerak
        cssCodeSplit: false,
        assetsInlineLimit: 100_000_000,
    },
})
