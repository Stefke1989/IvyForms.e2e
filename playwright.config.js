import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:8000',
    storageState: 'storageState.json',
  },
});
