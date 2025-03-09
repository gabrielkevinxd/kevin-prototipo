import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpa automaticamente após cada teste
afterEach(() => {
  cleanup();
}); 