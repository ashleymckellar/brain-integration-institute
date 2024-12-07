import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({

    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/pracs/public-profiles': { 
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
});

