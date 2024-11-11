import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/',
    plugins: [react(), tsconfigPaths()],
    server: {
        host: 'localhost',
        port: 3000,
        open: false,
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: 'index.html',
        },
    },
});
