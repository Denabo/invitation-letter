import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'animation-vendor': ['framer-motion'],
                    'query-vendor': ['@tanstack/react-query'],
                    'ui-vendor': ['lucide-react', 'react-confetti'],
                },
            },
        },
        target: 'es2015',
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'framer-motion',
            '@tanstack/react-query',
        ],
    },
});