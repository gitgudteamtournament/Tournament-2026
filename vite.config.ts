import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL;

  const proxyTarget = 'https://tournament-2026.onrender.com';

  const proxy: Record<string, string | ProxyOptions> = apiUrl ? {} : {
    '/api': {
      target: proxyTarget,
      changeOrigin: true,
      secure: false,
    },
    '/auth': {
      target: proxyTarget,
      changeOrigin: true,
      secure: false,
    },
  };

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
