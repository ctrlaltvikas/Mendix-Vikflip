import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/widget',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/VikFlip.tsx'),
      name: 'VikFlip',
      formats: ['umd'],
      fileName: () => 'VikFlip.js'
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
