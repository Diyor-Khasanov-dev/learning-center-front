import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        // `@/...` — chuqur papkalardan `../../../` yozmaslik uchun
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        // Testlarda CSS kerak emas — Tailwind'ni har testda kompilyatsiya
        // qilish sekin, natijaga esa ta'sir qilmaydi.
        css: false,
        // Faqat ilova testlari — `landing/` o'z vositalari bilan tekshiriladi.
        include: ['src/**/*.test.{ts,tsx}'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**', 'src/**/index.ts'],
        },
    },
})
