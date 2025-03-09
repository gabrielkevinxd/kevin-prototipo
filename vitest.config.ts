import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{ts,js}',
      ],
      thresholds: {
        statements: 75,
        branches: 75,
        functions: 75,
        lines: 75,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@core': resolve(__dirname, './src/core'),
      '@features': resolve(__dirname, './src/features'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
}); 