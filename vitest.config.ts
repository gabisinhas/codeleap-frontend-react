import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
    },
    // Prevent "too many open files" error
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 3,
      },
    },
    // Set file watching limits
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
});
